import Blog from './model/blog.model.js';
import Brand from './model/brand.model.js';
import Project from './model/project.model.js';
import Service from './model/service.model.js';
import User from './model/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const typeDefs = `#graphql
  type Blog {
    id: ID!
    _id: ID!
    slug: String!
    title: String!
    excerpt: String!
    content: [String]!
    category: String!
    date: String
    readTime: String
    image: String!
    author: String
    tags: [String]
    createdAt: String
    updatedAt: String
  }

  type Feature {
    icon: String
    title: String
    desc: String
    bg: String
    iconColor: String
  }

  type Product {
    title: String
    desc: String
    image: String
    featuresList: [String]
  }

  type Brand {
    id: ID!
    _id: ID!
    slug: String!
    brandName: String!
    title: String!
    subtitle: String
    description: String
    heroImage: String
    features: [Feature]
    products: [Product]
    createdAt: String
    updatedAt: String
  }

  type Project {
    id: ID!
    _id: ID!
    slug: String!
    title: String!
    description: String!
    location: String
    completionDate: String
    images: [String]
    featuredImage: String
    createdAt: String
    updatedAt: String
  }

  type Process {
    step: String
    title: String
    desc: String
  }

  type FAQ {
    q: String
    a: String
  }

  type Service {
    id: ID!
    _id: ID!
    slug: String!
    icon: String!
    image: String
    badge: String
    title: String!
    tagline: String
    desc: String!
    longDesc: String
    highlights: [String]
    duration: String
    price: String
    rating: Float
    reviews: Int
    process: [Process]
    faqs: [FAQ]
    createdAt: String
    updatedAt: String
  }

  input FeatureInput {
    icon: String
    title: String
    desc: String
    bg: String
    iconColor: String
  }

  input ProductInput {
    title: String
    desc: String
    image: String
    featuresList: [String]
  }

  input ProcessInput {
    step: String
    title: String
    desc: String
  }

  input FAQInput {
    q: String
    a: String
  }

  type AuthPayload {
    token: String!
    user: String!
  }

  type Query {
    getBlogs: [Blog]
    getBlogBySlug(slug: String!): Blog
    getBrands: [Brand]
    getBrandBySlug(slug: String!): Brand
    getProjects: [Project]
    getProjectBySlug(slug: String!): Project
    getServices: [Service]
    getServiceBySlug(slug: String!): Service
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    loginUser(email: String!, password: String!): AuthPayload
    registerUser(name: String!, email: String!, password: String!): AuthPayload

    createBlog(slug: String!, title: String!, excerpt: String!, content: [String]!, category: String!, date: String, readTime: String, image: String!, author: String, tags: [String]): Blog
    updateBlog(id: ID!, slug: String, title: String, excerpt: String, content: [String], category: String, date: String, readTime: String, image: String, author: String, tags: [String]): Blog
    deleteBlog(id: ID!): Boolean

    createBrand(slug: String!, brandName: String!, title: String!, subtitle: String, description: String, heroImage: String, features: [FeatureInput], products: [ProductInput]): Brand
    updateBrand(id: ID!, slug: String, brandName: String, title: String, subtitle: String, description: String, heroImage: String, features: [FeatureInput], products: [ProductInput]): Brand
    deleteBrand(id: ID!): Boolean

    createProject(slug: String!, title: String!, description: String!, location: String, completionDate: String, images: [String], featuredImage: String): Project
    updateProject(id: ID!, slug: String, title: String, description: String, location: String, completionDate: String, images: [String], featuredImage: String): Project
    deleteProject(id: ID!): Boolean

    createService(slug: String!, icon: String!, image: String, badge: String, title: String!, tagline: String, desc: String!, longDesc: String, highlights: [String], duration: String, price: String, rating: Float, reviews: Int, process: [ProcessInput], faqs: [FAQInput]): Service
    updateService(id: ID!, slug: String, icon: String, image: String, badge: String, title: String, tagline: String, desc: String, longDesc: String, highlights: [String], duration: String, price: String, rating: Float, reviews: Int, process: [ProcessInput], faqs: [FAQInput]): Service
    deleteService(id: ID!): Boolean
  }
`;

export const resolvers = {
  Query: {
    getBlogs: async () => await Blog.find().sort({ createdAt: -1 }),
    getBlogBySlug: async (_, { slug }) => await Blog.findOne({ slug }),
    
    getBrands: async () => await Brand.find().sort({ createdAt: -1 }),
    getBrandBySlug: async (_, { slug }) => await Brand.findOne({ slug }),
    
    getProjects: async () => await Project.find().sort({ createdAt: -1 }),
    getProjectBySlug: async (_, { slug }) => await Project.findOne({ slug }),
    
    getServices: async () => await Service.find().sort({ createdAt: -1 }),
    getServiceBySlug: async (_, { slug }) => await Service.findOne({ slug })
  },
  
  Mutation: {
    registerUser: async (_, { name, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error('Email already in use');

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      const token = jwt.sign(
        { email: user.email, role: user.role, id: user._id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      return { token, user: user.email };
    },

    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid email or password');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Invalid email or password');

      const token = jwt.sign(
        { email: user.email, role: user.role, id: user._id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      return { token, user: user.email };
    },

    login: async (_, { email, password }) => {
      const validEmail = process.env.ADMIN_EMAIL;
      const validPass = process.env.ADMIN_PASSWORD;

      if (!validEmail || !validPass) {
        throw new Error('Admin credentials not set on server');
      }

      // Check credentials (for a single built-in admin account)
      if (email !== validEmail || password !== validPass) {
        throw new Error('Invalid email or password');
      }

      // Sign token
      const token = jwt.sign(
        { email, role: 'ADMIN' },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      return {
        token,
        user: email
      };
    },

    createBlog: async (_, args, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const blog = new Blog(args);
      return await blog.save();
    },
    updateBlog: async (_, { id, ...args }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      return await Blog.findByIdAndUpdate(id, args, { new: true });
    },
    deleteBlog: async (_, { id }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const doc = await Blog.findByIdAndDelete(id);
      return !!doc;
    },

    createBrand: async (_, args, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const brand = new Brand(args);
      return await brand.save();
    },
    updateBrand: async (_, { id, ...args }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      return await Brand.findByIdAndUpdate(id, args, { new: true });
    },
    deleteBrand: async (_, { id }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const doc = await Brand.findByIdAndDelete(id);
      return !!doc;
    },

    createProject: async (_, args, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const project = new Project(args);
      return await project.save();
    },
    updateProject: async (_, { id, ...args }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      return await Project.findByIdAndUpdate(id, args, { new: true });
    },
    deleteProject: async (_, { id }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const doc = await Project.findByIdAndDelete(id);
      return !!doc;
    },

    createService: async (_, args, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const service = new Service(args);
      return await service.save();
    },
    updateService: async (_, { id, ...args }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      return await Service.findByIdAndUpdate(id, args, { new: true });
    },
    deleteService: async (_, { id }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const doc = await Service.findByIdAndDelete(id);
      return !!doc;
    }
  }
};

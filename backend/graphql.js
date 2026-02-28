import Blog from './model/blog.model.js';
import Brand from './model/brand.model.js';
import Project from './model/project.model.js';
import Service from './model/service.model.js';
import User from './model/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const typeDefs = `#graphql

  # Blog: image upload handled via REST /api/blogs
  # Model fields: title, content([String]), category, image
  type Blog {
    id: ID!
    _id: ID!
    title: String!
    content: [String]!
    category: String!
    image: String!
    createdAt: String
    updatedAt: String
  }

  # Brand: image upload handled via REST /api/brands
  type Brand {
    id: ID!
    _id: ID!
    heroImage: String
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

  # Service: image upload handled via REST /api/services
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

  # Project: image upload handled via REST /api/projects
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
    # Blogs: read via GraphQL, write via REST /api/blogs
    getBlogs: [Blog]
    getBlogById(id: ID!): Blog

    # Brands: read via GraphQL, write via REST /api/brands
    getBrands: [Brand]
    getBrandById(id: ID!): Brand

    # Services: read via GraphQL, write via REST /api/services
    getServices: [Service]
    getServiceBySlug(slug: String!): Service

    # Projects: read via GraphQL, write via REST /api/projects
    getProjects: [Project]
    getProjectBySlug(slug: String!): Project
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    loginUser(email: String!, password: String!): AuthPayload
    registerUser(name: String!, email: String!, password: String!): AuthPayload

    # Blog: delete only via GraphQL (create/update via REST /api/blogs)
    deleteBlog(id: ID!): Boolean

    # Brand: delete only via GraphQL (create/update via REST /api/brands)
    deleteBrand(id: ID!): Boolean

    # Service: delete only via GraphQL (create/update via REST /api/services)
    deleteService(id: ID!): Boolean

    # Project: delete only via GraphQL (create/update via REST /api/projects)
    deleteProject(id: ID!): Boolean
  }
`;

export const resolvers = {
  Query: {
    // Blogs: read via GraphQL (writes go through REST)
    getBlogs: async () => await Blog.find().sort({ createdAt: -1 }),
    getBlogById: async (_, { id }) => await Blog.findById(id),

    // Brands: read via GraphQL (writes go through REST)
    getBrands: async () => await Brand.find().sort({ createdAt: -1 }),
    getBrandById: async (_, { id }) => await Brand.findById(id),

    // Services: read via GraphQL (writes go through REST)
    getServices: async () => await Service.find().sort({ createdAt: -1 }),
    getServiceBySlug: async (_, { slug }) => await Service.findOne({ slug }),

    // Projects: read via GraphQL (writes go through REST)
    getProjects: async () => await Project.find().sort({ createdAt: -1 }),
    getProjectBySlug: async (_, { slug }) => await Project.findOne({ slug }),
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

      if (email !== validEmail || password !== validPass) {
        throw new Error('Invalid email or password');
      }

      const token = jwt.sign(
        { email, role: 'ADMIN' },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      return { token, user: email };
    },

    // Blog: delete only (create/update handled by REST /api/blogs)
    deleteBlog: async (_, { id }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const doc = await Blog.findByIdAndDelete(id);
      return !!doc;
    },

    // Brand: delete only (create/update handled by REST /api/brands)
    deleteBrand: async (_, { id }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const doc = await Brand.findByIdAndDelete(id);
      return !!doc;
    },

    // Service: delete only (create/update handled by REST /api/services)
    deleteService: async (_, { id }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const doc = await Service.findByIdAndDelete(id);
      return !!doc;
    },

    // Project: delete only (create/update handled by REST /api/projects)
    deleteProject: async (_, { id }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const doc = await Project.findByIdAndDelete(id);
      return !!doc;
    },
  }
};
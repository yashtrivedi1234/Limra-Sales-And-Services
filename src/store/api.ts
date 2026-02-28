import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { gql } from 'graphql-request';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: graphqlRequestBaseQuery({
        url: `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/graphql`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('adminToken');
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['Blog', 'Service', 'Brand', 'Project'],
    endpoints: (builder) => ({

        // ================= AUTH =================
        loginAdmin: builder.mutation<any, any>({
            query: (variables) => ({
                document: gql`
                    mutation Login($email: String!, $password: String!) {
                        login(email: $email, password: $password) {
                            token
                            user
                        }
                    }
                `,
                variables,
            }),
        }),

        loginUser: builder.mutation<any, any>({
            query: (variables) => ({
                document: gql`
                    mutation LoginUser($email: String!, $password: String!) {
                        loginUser(email: $email, password: $password) {
                            token
                            user
                        }
                    }
                `,
                variables,
            }),
        }),

        registerUser: builder.mutation<any, any>({
            query: (variables) => ({
                document: gql`
                    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
                        registerUser(name: $name, email: $email, password: $password) {
                            token
                            user
                        }
                    }
                `,
                variables,
            }),
        }),

        // ================= BLOGS =================
        getBlogs: builder.query<any[], void>({
            query: () => ({
                document: gql`
                    query GetBlogs {
                        getBlogs {
                            id
                            _id
                            slug
                            title
                            excerpt
                            content
                            category
                            date
                            readTime
                            image
                            author
                            tags
                        }
                    }
                `,
            }),
            transformResponse: (res: any) => res.getBlogs,
            providesTags: ['Blog'],
        }),

        addBlog: builder.mutation<any, any>({
            query: (variables) => ({
                document: gql`
                    mutation CreateBlog($title: String!, $content: [String]!, $category: String!, $image: String!) {
                        createBlog(title: $title, content: $content, category: $category, image: $image) {
                            id
                        }
                    }
                `,
                variables,
            }),
            invalidatesTags: ['Blog'],
        }),

        updateBlog: builder.mutation<any, { id: string; variables: any }>({
            query: ({ id, variables }) => ({
                document: gql`
                    mutation UpdateBlog($id: ID!, $title: String, $content: [String], $category: String, $image: String) {
                        updateBlog(id: $id, title: $title, content: $content, category: $category, image: $image) {
                            id
                        }
                    }
                `,
                variables: { id, ...variables },
            }),
            invalidatesTags: ['Blog'],
        }),

        deleteBlog: builder.mutation<any, string>({
            query: (id) => ({
                document: gql`
                    mutation DeleteBlog($id: ID!) {
                        deleteBlog(id: $id)
                    }
                `,
                variables: { id },
            }),
            invalidatesTags: ['Blog'],
        }),

        // ================= SERVICES =================
        getServices: builder.query<any[], void>({
            query: () => ({
                document: gql`
                    query GetServices {
                        getServices {
                            id
                            _id
                            slug
                            icon
                            title
                            desc
                            image
                            badge
                            tagline
                            longDesc
                            highlights
                            duration
                            price
                            rating
                            reviews
                            process { step title desc }
                            faqs { q a }
                        }
                    }
                `,
            }),
            transformResponse: (res: any) => res.getServices,
            providesTags: ['Service'],
        }),

        addService: builder.mutation<any, any>({
            query: (variables) => ({
                document: gql`
                    mutation CreateService(
                        $slug: String!, $icon: String!, $title: String!,
                        $desc: String!, $image: String, $badge: String,
                        $tagline: String, $longDesc: String, $highlights: [String],
                        $duration: String, $price: String, $rating: Float,
                        $reviews: Int, $process: [ProcessInput], $faqs: [FAQInput]
                    ) {
                        createService(
                            slug: $slug, icon: $icon, title: $title,
                            desc: $desc, image: $image, badge: $badge,
                            tagline: $tagline, longDesc: $longDesc,
                            highlights: $highlights, duration: $duration,
                            price: $price, rating: $rating,
                            reviews: $reviews, process: $process, faqs: $faqs
                        ) { id }
                    }
                `,
                variables,
            }),
            invalidatesTags: ['Service'],
        }),

        updateService: builder.mutation<any, { id: string; variables: any }>({
            query: ({ id, variables }) => ({
                document: gql`
                    mutation UpdateService($id: ID!, $slug: String, $icon: String, $title: String,
                        $desc: String, $image: String, $badge: String, $tagline: String,
                        $longDesc: String, $highlights: [String], $duration: String,
                        $price: String, $rating: Float, $reviews: Int,
                        $process: [ProcessInput], $faqs: [FAQInput]) {
                        updateService(
                            id: $id, slug: $slug, icon: $icon, title: $title,
                            desc: $desc, image: $image, badge: $badge,
                            tagline: $tagline, longDesc: $longDesc,
                            highlights: $highlights, duration: $duration,
                            price: $price, rating: $rating,
                            reviews: $reviews, process: $process, faqs: $faqs
                        ) { id }
                    }
                `,
                variables: { id, ...variables },
            }),
            invalidatesTags: ['Service'],
        }),

        deleteService: builder.mutation<any, string>({
            query: (id) => ({
                document: gql`
                    mutation DeleteService($id: ID!) {
                        deleteService(id: $id)
                    }
                `,
                variables: { id },
            }),
            invalidatesTags: ['Service'],
        }),

        // ================= BRANDS =================
        getBrands: builder.query<any[], void>({
            query: () => ({
                document: gql`
                    query GetBrands {
                        getBrands {
                            id
                            _id
                            slug
                            brandName
                            title
                            subtitle
                            description
                            heroImage
                            features { icon title desc bg iconColor }
                            products { title desc image featuresList }
                        }
                    }
                `,
            }),
            transformResponse: (res: any) => res.getBrands,
            providesTags: ['Brand'],
        }),

        addBrand: builder.mutation<any, any>({
            query: (variables) => ({
                document: gql`
                    mutation CreateBrand($slug: String!, $brandName: String!, $title: String!,
                        $subtitle: String, $description: String, $heroImage: String,
                        $features: [FeatureInput], $products: [ProductInput]) {
                        createBrand(
                            slug: $slug, brandName: $brandName, title: $title,
                            subtitle: $subtitle, description: $description,
                            heroImage: $heroImage, features: $features, products: $products
                        ) { id }
                    }
                `,
                variables,
            }),
            invalidatesTags: ['Brand'],
        }),

        updateBrand: builder.mutation<any, { id: string; variables: any }>({
            query: ({ id, variables }) => ({
                document: gql`
                    mutation UpdateBrand($id: ID!, $slug: String, $brandName: String,
                        $title: String, $subtitle: String, $description: String,
                        $heroImage: String, $features: [FeatureInput], $products: [ProductInput]) {
                        updateBrand(
                            id: $id, slug: $slug, brandName: $brandName,
                            title: $title, subtitle: $subtitle,
                            description: $description, heroImage: $heroImage,
                            features: $features, products: $products
                        ) { id }
                    }
                `,
                variables: { id, ...variables },
            }),
            invalidatesTags: ['Brand'],
        }),

        deleteBrand: builder.mutation<any, string>({
            query: (id) => ({
                document: gql`
                    mutation DeleteBrand($id: ID!) {
                        deleteBrand(id: $id)
                    }
                `,
                variables: { id },
            }),
            invalidatesTags: ['Brand'],
        }),

        // ================= PROJECTS =================
        getProjects: builder.query<any[], void>({
            query: () => ({
                document: gql`
                    query GetProjects {
                        getProjects {
                            id
                            _id
                            slug
                            title
                            description
                            location
                            completionDate
                            images
                            featuredImage
                        }
                    }
                `,
            }),
            transformResponse: (res: any) => res.getProjects,
            providesTags: ['Project'],
        }),

        addProject: builder.mutation<any, any>({
            query: (variables) => ({
                document: gql`
                    mutation CreateProject($slug: String!, $title: String!, $description: String!,
                        $location: String, $completionDate: String, $images: [String],
                        $featuredImage: String) {
                        createProject(
                            slug: $slug, title: $title, description: $description,
                            location: $location, completionDate: $completionDate,
                            images: $images, featuredImage: $featuredImage
                        ) { id }
                    }
                `,
                variables,
            }),
            invalidatesTags: ['Project'],
        }),

        updateProject: builder.mutation<any, { id: string; variables: any }>({
            query: ({ id, variables }) => ({
                document: gql`
                    mutation UpdateProject($id: ID!, $slug: String, $title: String,
                        $description: String, $location: String,
                        $completionDate: String, $images: [String],
                        $featuredImage: String) {
                        updateProject(
                            id: $id, slug: $slug, title: $title,
                            description: $description, location: $location,
                            completionDate: $completionDate,
                            images: $images, featuredImage: $featuredImage
                        ) { id }
                    }
                `,
                variables: { id, ...variables },
            }),
            invalidatesTags: ['Project'],
        }),

        deleteProject: builder.mutation<any, string>({
            query: (id) => ({
                document: gql`
                    mutation DeleteProject($id: ID!) {
                        deleteProject(id: $id)
                    }
                `,
                variables: { id },
            }),
            invalidatesTags: ['Project'],
        }),
    }),
});

export const {
    useLoginAdminMutation,
    useLoginUserMutation,
    useRegisterUserMutation,

    useGetBlogsQuery,
    useAddBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,

    useGetServicesQuery,
    useAddServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,

    useGetBrandsQuery,
    useAddBrandMutation,
    useUpdateBrandMutation,
    useDeleteBrandMutation,

    useGetProjectsQuery,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = api;
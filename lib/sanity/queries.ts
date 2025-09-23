import groq from "groq";

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    excerpt,
    coverImage,
    "category": category->title,
    "author": author->name,
    "authorAvatar": author->avatar,
    "authorSlug": author->slug.current,
    "date": coalesce(publishedAt, _updatedAt),
    content
  }
`;

export const allArticlesQuery = groq`
  *[_type == "article"]|order(coalesce(publishedAt, _updatedAt) desc){
    "slug": slug.current,
    title,
    excerpt,
    coverImage,
    "category": category->title,
    "author": author->name,
    "date": coalesce(publishedAt, _updatedAt),
    trending,
    spotlight,
    editorsPick
  }
`;

export const byCategoryQuery = groq`
  *[_type == "article" && category->slug.current == $slug]{
    "slug": slug.current,
    title,
    excerpt,
    coverImage,
    "category": category->title,
    "author": author->name,
    "date": coalesce(publishedAt, _updatedAt)
  }
`;

export const allCategoriesQuery = groq`*[_type == "category" ]{ title, "slug": slug.current }`;

export const searchArticlesQuery = groq`
  *[_type == "article" && (title match $term || excerpt match $term)]|order(coalesce(publishedAt, _updatedAt) desc){
    "slug": slug.current,
    title,
    excerpt,
    coverImage,
    "category": category->title,
    "author": author->name,
    "date": coalesce(publishedAt, _updatedAt)
  }
`;

export const allAuthorsQuery = groq`
  *[_type == "author"]|order(name asc){
    name,
    "slug": slug.current,
    avatar,
    bio,
    social
  }
`;

export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0]{
    name,
    "slug": slug.current,
    avatar,
    bio,
    social
  }
`;

export const articlesByAuthorQuery = groq`
  *[_type == "article" && author->slug.current == $slug]|order(coalesce(publishedAt, _updatedAt) desc){
    "slug": slug.current,
    title,
    excerpt,
    coverImage,
    "category": category->title,
    "author": author->name,
    "date": coalesce(publishedAt, _updatedAt)
  }
`;



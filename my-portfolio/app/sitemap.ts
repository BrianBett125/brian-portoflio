import { MetadataRoute } from 'next';
import { getProjects } from '@/lib/projects';
import { getAllPosts } from '@/lib/posts';
import { getSiteUrl } from '@/lib/site-url';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();

  const projects = await getProjects();
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date().toISOString(),
  }));

  const posts = await getAllPosts();
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    ...(post.date ? { lastModified: new Date(post.date) } : {}),
  }));

  const routes = ['', '/about', '/projects', '/blog', '/contact', '/now'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const tagRoutes = [...new Set(posts.flatMap((post) => post.tags))].map((tag) => ({
    url: `${baseUrl}/blog/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...projectRoutes, ...postRoutes, ...tagRoutes];
}

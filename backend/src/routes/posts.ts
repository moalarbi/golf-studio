import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

const createPostSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  content: z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published']),
});

const updatePostSchema = createPostSchema.partial();

// Get all published posts (public)
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    res.json(posts.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      tags: post.tags,
      status: post.status,
      author: post.author?.name,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
    })));
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single post by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    if (!post || post.status !== 'published') {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      tags: post.tags,
      status: post.status,
      author: post.author?.name,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Create post (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const data = createPostSchema.parse(req.body);

    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slug: data.slug },
    });

    if (existingPost) {
      return res.status(400).json({ error: 'Slug already exists' });
    }

    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        tags: data.tags || [],
        status: data.status,
        publishedAt: data.status === 'published' ? new Date() : null,
      },
    });

    res.status(201).json({
      success: true,
      post: {
        id: post.id,
        title: post.title,
        slug: post.slug,
        status: post.status,
      },
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(400).json({ error: 'Failed to create post' });
  }
});

// Update post (admin only)
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const data = updatePostSchema.parse(req.body);

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        tags: data.tags,
        status: data.status,
        publishedAt: data.status === 'published' ? new Date() : undefined,
      },
    });

    res.json({
      success: true,
      post: {
        id: post.id,
        title: post.title,
        slug: post.slug,
        status: post.status,
      },
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(400).json({ error: 'Failed to update post' });
  }
});

// Delete post (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.post.delete({
      where: { id },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(400).json({ error: 'Failed to delete post' });
  }
});

export default router;

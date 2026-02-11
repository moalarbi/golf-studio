import type { Lead, BlogPost } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Lead API
export const createLead = async (lead: Lead): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating lead:', error);
    return { success: false, message: 'Failed to create lead' };
  }
};

export const getLeads = async (token: string): Promise<Lead[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leads`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
};

export const updateLead = async (id: string, updates: Partial<Lead>, token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(updates),
    });
    return response.ok;
  } catch (error) {
    console.error('Error updating lead:', error);
    return false;
  }
};

// Auth API
export const login = async (email: string, password: string): Promise<{ token?: string; user?: any; error?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error logging in:', error);
    return { error: 'Failed to login' };
  }
};

// Blog API
export const getPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const getPost = async (slug: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts/${slug}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

export const createPost = async (post: BlogPost, token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(post),
    });
    return response.ok;
  } catch (error) {
    console.error('Error creating post:', error);
    return false;
  }
};

export const updatePost = async (id: string, post: Partial<BlogPost>, token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(post),
    });
    return response.ok;
  } catch (error) {
    console.error('Error updating post:', error);
    return false;
  }
};

export const deletePost = async (id: string, token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
};

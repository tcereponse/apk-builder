export type Role = 'ADMIN' | 'MODERATOR' | 'USER';

export type SiteStatus = 'PENDING' | 'VALIDATED' | 'REJECTED';

export type IngestionStatus = 'SUCCESS' | 'PARTIAL' | 'FAILED';

export interface User {
 id: string;
 email: string;
 name: string;
 role: Role;
 isActive: boolean;
 createdAt: string;
 updatedAt: string;
}

export interface Category {
 id: string;
 name: string;
 slug: string;
 description?: string;
 icon?: string;
 siteCount?: number;
 createdAt: string;
 updatedAt: string;
}

export interface Site {
 id: string;
 name: string;
 url: string;
 description?: string;
 logoUrl?: string;
 status: SiteStatus;
 categories: Category[];
 lastIngestedAt?: string;
 createdAt: string;
 updatedAt: string;
}

export interface RssFeed {
 id: string;
 url: string;
 frequency: string;
 defaultCategoryId?: string;
 defaultCategory?: Category;
 lastRunAt?: string;
 isActive: boolean;
 createdAt: string;
 updatedAt: string;
}

export interface IngestionLog {
 id: string;
 feedId?: string;
 status: IngestionStatus;
 message?: string;
 sitesCreated: number;
 sitesUpdated: number;
 createdAt: string;
}

export interface AuthState {
 user: User | null;
 token: string | null;
 isAuthenticated: boolean;
}

export interface FilterState {
 searchQuery: string;
 selectedCategories: string[];
 sortBy: 'recent' | 'popular' | 'alpha';
 currentPage: number;
 itemsPerPage: number;
}

export interface UIState {
 theme: 'dark' | 'light';
 isSidebarOpen: boolean;
 modal: {
 isOpen: boolean;
 type?: string;
 props?: Record<string, unknown>;
 };
 notification: {
 message: string;
 type: 'info' | 'success' | 'warning' | 'error';
 visible: boolean;
 } | null;
}

export interface ApiResponse<T> {
 data: T;
 message?: string;
 status: number;
}

export interface PaginatedResponse<T> {
 data: T[];
 total: number;
 page: number;
 totalPages: number;
 hasNext: boolean;
 hasPrev: boolean;
}

export interface LoginCredentials {
 email: string;
 password: string;
}

export interface RegisterCredentials {
 email: string;
 password: string;
 name: string;
}

export interface CreateCategoryPayload {
 name: string;
 description?: string;
 icon?: string;
}

export interface UpdateCategoryPayload extends Partial<CreateCategoryPayload> {
 id: string;
}

export interface CreateSitePayload {
 name: string;
 url: string;
 description?: string;
 logoUrl?: string;
 categoryIds: string[];
}

export interface UpdateSitePayload extends Partial<CreateSitePayload> {
 id: string;
 status?: SiteStatus;
}

export interface CreateRssFeedPayload {
 url: string;
 frequency: string;
 defaultCategoryId?: string;
}

export interface UpdateRssFeedPayload extends Partial<CreateRssFeedPayload> {
 id: string;
 isActive?: boolean;
}

export interface BreadcrumbItem {
 label: string;
 path: string;
 isActive?: boolean;
}

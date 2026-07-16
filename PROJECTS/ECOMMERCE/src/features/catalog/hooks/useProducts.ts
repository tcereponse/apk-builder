import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@shared/lib/api';
import { Product, ProductFilters } from '@shared/types';
import { productSchema } from '@shared/types';

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters as any).toString();
      const response = await api.get(`/products?${params}`);
      return response.data.map((p: any) => productSchema.parse(p));
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`);
      return productSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateProduct() {
 const queryClient = useQueryClient();
 return useMutation({
 mutationFn: (data: Omit<Product, 'id'>) => api.post('/products', data),
 onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
 });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Product> & { id: string }) =>
      api.put(`/products/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/products/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
}
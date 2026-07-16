import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@shared/lib/api';
import { Order } from '@shared/types';

export function useOrders() {
 return useQuery({
 queryKey: ['orders'],
 queryFn: async () => {
 const response = await api.get('/orders');
 return response.data as Order[];
 },
 });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const response = await api.get(`/orders/${id}`);
      return response.data as Order;
    },
    enabled: !!id,
  });
}

export function useCreateOrder() {
 const queryClient = useQueryClient();
 return useMutation({
 mutationFn: (data: Omit<Order, 'id'>) => api.post('/orders', data),
 onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
 });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.patch(`/orders/${id}`, { status }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', id] });
    },
  });
}
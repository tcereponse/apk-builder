import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@shared/lib/api-client';
import { Order, ShippingAddress, OrderSchema } from '@shared/types';

export function useCheckout() {
 return useMutation({
 mutationFn: async ({ items, shippingAddress, total }: { items: any[]; shippingAddress: ShippingAddress; total: number }) => {
 const response = await apiClient.post('/orders', {
 items,
 shippingAddress,
 total,
 status: 'pending',
 });
 return OrderSchema.parse(response.data);
 },
 });
}
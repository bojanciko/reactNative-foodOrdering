import { supabase } from "@/lib/supabase"
import { useQuery, useMutation, useQueryClient } from "react-query"

export const useProductList = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*')
      if (error) {
        throw new Error(error.message)
      }
      return data
    }
  })
}

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
      if (error) {
        throw new Error(error.message)
      }
      return data
    }

  })
}

export const useInsertProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(data: any) {
      const { data: newProduct, error } = await supabase.from('products').insert({
        name: data.name,
        image: data.image,
        price: data.price
      }).single()

      if (error) {
        throw new Error(error.message)
      }
      return newProduct
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries(['products'])
      await queryClient.invalidateQueries(['products', id])
    }
  })
}


export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(data: any) {
      const { data: updatedProduct, error } = await supabase.from('products').update({
        name: data.name,
        image: data.image,
        price: data.price
      }).eq('id', data.id).single()

      if (error) {
        throw new Error(error.message)
      }
      return updatedProduct
    },
    async onSuccess() {
      await queryClient.invalidateQueries(['products'])
    }
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(id: number) {
      await supabase.from('products').delete().eq('id', id)
    },
    async onSuccess() {
      await queryClient.invalidateQueries(['products'])
    }
  })
}
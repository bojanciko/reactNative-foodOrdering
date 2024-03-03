import { supabase } from "@/lib/supabase"
import { useAuth } from "@/providers/AuthProvider"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { InsertTables } from "@/types"


export const useInsertOrderItems = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(items: InsertTables<'order_items'>[]) {
      const { data: newProduct, error } = await supabase.from('order_items').insert(items).select()

      if (error) {
        throw new Error(error.message)
      }
      return newProduct
    }
  })
}
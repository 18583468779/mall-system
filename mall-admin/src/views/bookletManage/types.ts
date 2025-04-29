export interface BookletItem {
    booklet_id?: number
    title: string
    description: string
    cover_image: string
    price: number
    status: 'draft' | 'published' | 'archived'
    author_id: number
    category_id?: number
    created_at?: string
    updated_at?: string
  }
  
  export interface BookletListParams {
    page?: number
    pageSize?: number
    title?: string
    status?: string
  }
  
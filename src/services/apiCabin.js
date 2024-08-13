import supabase from './supabase'

export async function getCabin() {
    const {data, error} = await supabase.from('cabin').select('*')
    if(error){
        console.error(error)
        throw new Error('Cabin could not be laoded!!!')
    }
    return data
}
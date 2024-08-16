import supabase, {supabaseUrl} from './supabase'

export async function getCabin() {
    const { data, error } = await supabase.from('cabin').select('*')
    if (error) throw new Error('Cabin could not be laoded!!!')
    return data
}

export async function deleteCabin(id) {
    const { data, error } = await supabase.from('cabin').delete().eq('id', id)
    if (error) throw new Error('Cabin could not be deleted!!!')
    return data
}

export async function createEditCabin(newCabin, id) {
    let query = supabase.from('cabin')
    let uploadQuery = supabase.storage.from('cabin-images')
    const hasImage = typeof  newCabin.image === 'string'
    const imageName = hasImage ? newCabin.image?.replaceAll('/','') : newCabin.image?.name.replaceAll('/','')
    const imagePath = hasImage ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    if(!hasImage) uploadQuery = await uploadQuery.upload(imageName,newCabin.image)
    if(!id) query = query.insert([{...newCabin, image: imagePath}])
    else query = query.update({...newCabin, image: imagePath}).eq('id', id)
    const {error: storageError} = uploadQuery
    const { data, error } = await query.select().single()
    if(storageError) throw new Error('Image can not be uploaded!!!')
    if (error) throw new Error('Cabin could not be created!!!')
    return data
}
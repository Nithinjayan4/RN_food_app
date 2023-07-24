import imageURLBuilder from '@sanity/image-url'
import  {createClient} from '@sanity/client'


const client = createClient({
    projectId: 'npcegap4',
    dataset: 'production',
    useCdn: true,
    apiVersion:'2021-10-21',
})

const builder= imageURLBuilder(client);
export const urlFor = (source) => builder.image(source);



export default client

//sanity cors add http://localhost:3333
//npcegap4
// my id is 9s4p107j
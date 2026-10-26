import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://hluhmgtclkgngwxtmiwp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_VqFr2_ncdSkWco5eoHsv7A_T5rKrmsY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getItems() {
    const { data, error } = await supabase.from('items').select('*').order('id', { ascending: true });
    if (error) { console.error('getItems Error:', error); return []; }
    return data || [];
}

export async function updateItemStock(id, newStock, supplier) {
    const { error } = await supabase
        .from('items')
        .update({ stock: newStock, supplier: supplier })
        .eq('id', id);
    if (error) console.error('updateItemStock Error:', error);
}

export async function addNewItem(item) {
    const { error } = await supabase.from('items').insert([item]);
    if (error) console.error('addNewItem Error:', error);
}

export async function deleteItem(id) {
    const { error } = await supabase.from('items').delete().eq('id', id);
    if (error) console.error('deleteItem Error:', error);
}

export async function logCheckout(logData) {
    const { error } = await supabase.from('logs').insert([logData]);
    if (error) console.error('logCheckout Error:', error);
}

export async function getLogs() {
    const { data, error } = await supabase.from('logs').select('*').order('created_at', { ascending: false });
    if (error) { console.error('getLogs Error:', error); return []; }
    return data || [];
}

export async function getRestockLogs() {
    const { data, error } = await supabase.from('restock_logs').select('*').order('created_at', { ascending: false });
    if (error) { console.error('getRestockLogs Error:', error); return []; }
    return data || [];
}

export async function logRestock(logData) {
    const { error } = await supabase.from('restock_logs').insert([logData]);
    if (error) console.error('logRestock Error:', error);
}
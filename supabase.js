import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://hluhmgtclkgngwxtmiwp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_VqFr2_ncdSkWco5eoHsv7A_T5rKrmsY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ดึงรายการพัสดุทั้งหมด
export async function getItems() {
    const { data, error } = await supabase.from('items').select('*').order('id', { ascending: true });
    if (error) { console.error(error); return []; }
    return data;
}

// อัปเดตสต็อกพัสดุ
export async function updateItemStock(id, newStock, supplier) {
    const { error } = await supabase
        .from('items')
        .update({ stock: newStock, supplier: supplier })
        .eq('id', id);
    if (error) console.error(error);
}

// เพิ่มพัสดุใหม่
export async function addNewItem(item) {
    const { error } = await supabase.from('items').insert([item]);
    if (error) console.error(error);
}

// ลบพัสดุ
export async function deleteItem(id) {
    const { error } = await supabase.from('items').delete().eq('id', id);
    if (error) console.error(error);
}

// บันทึกประวัติการเบิก (พร้อมเก็บเวลาเครื่องและรุ่นอุปกรณ์)
export async function logCheckout(logData) {
    const { error } = await supabase.from('checkout_logs').insert([logData]);
    if (error) console.error(error);
}

// ดึงประวัติการเบิก (สำหรับแอดมิน)
export async function getLogs() {
    const { data, error } = await supabase.from('checkout_logs').select('*').order('id', { ascending: false });
    if (error) { console.error(error); return []; }
    return data;
}
import supabase from "../config/supabaseClient"

const fetchChangeOrderData = async () => {
    try {
        const { data, error } = await supabase
            .from('change_order')
            .select('*')
        if (error) {
            throw error
        }
        return data
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
};
const fetchPendingOrderData = async () => {
    try {
        const { data, error } = await supabase
            .from('change_order')
            .select('*')
            .eq("status", 'pending')
        if (error) {
            throw error
        }
        return data
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
};

const fetchClientData = async () => {
    try {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
        if (error) {
            throw error
        }
        return data
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
}

const fetchFloatOrderData = async () => {
    try {
        const { data, error } = await supabase
            .from('float_order')
            .select('*')
        if (error) {
            throw error
        }
        return data

    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
}
const fetchPendingFloatOrderData = async () => {
    try {
        const { data, error } = await supabase
            .from('float_order')
            .select('*')
            .eq('status', 'pending')
        if (error) {
            throw error
        }
        return data

    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
}


export { fetchChangeOrderData, fetchClientData, fetchFloatOrderData, fetchPendingOrderData, fetchPendingFloatOrderData }
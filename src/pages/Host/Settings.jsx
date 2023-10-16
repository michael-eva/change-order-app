import React, { useEffect, useState } from 'react';
import Toggle from '../../Toggle';
import supabase from '../../config/supabaseClient';

function Settings() {
    const authToken = localStorage.getItem('sb-wsolkhiobftucjmfkwkk-auth-token')
    const parsedToken = JSON.parse(authToken)
    const userId = parsedToken.user.id
    const [formData, setFormData] = useState({
        fifty: 0,
        twenty: 0,
        ten: 0,
        five: 0,
        two: 0,
        one: 0,
        fiftyCents: 0,
        twentyCents: 0,
        tenCents: 0,
        fiveCents: 0
    })
    console.log(userId);
    useEffect(() => {
        const loadWarnings = async () => {
            try {
                const { data, error } = await supabase
                    .from('low_limit_warning')
                    .select('*')
                    .eq('companyId', userId)
                    .single();

                if (error) {
                    console.error('Error loading warning:', error);
                } else {
                    setFormData(data);
                }
            } catch (error) {
                console.error('Error loading warning:', error);
            }
        };
        loadWarnings();
    }, [userId]);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { error } = await supabase
                .from('low_limit_warning')
                .upsert([
                    {
                        companyId: userId,
                        ...formData,
                    },
                ]);

            if (error) {
                console.error('Error updating warning:', error);
            } else {
                console.log('Warning updated successfully');
            }
        } catch (error) {
            console.error('Error updating warning:', error);
        }
    };

    return (
        <>
            <Toggle>
                <Toggle.Button>Set Limit Warning?</Toggle.Button>
                {/* <Toggle.On> */}
                <form onSubmit={handleSubmit}>

                    <div className="input">
                        <label className='label'>
                            $50
                        </label>
                        <input
                            type="number"
                            value={formData.fifty}
                            name='fifty'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input">
                        <label className='label'>
                            $20
                        </label>
                        <input
                            type="number"
                            value={formData.twenty}
                            name='twenty'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input">
                        <label className='label'>
                            $10
                        </label>
                        <input
                            type="number"
                            value={formData.ten}
                            name='ten'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input">
                        <label className='label'>
                            $5
                        </label>
                        <input
                            type="number"
                            value={formData.five}
                            name='five'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input">
                        <label className='label'>
                            $2
                        </label>
                        <input
                            type="number"
                            value={formData.two}
                            name='two'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input">
                        <label className='label'>
                            $1
                        </label>
                        <input
                            type="number"
                            value={formData.one}
                            name='one'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input">
                        <label className='label'>
                            50c
                        </label>
                        <input
                            type="number"
                            value={formData.fiftyCents}
                            name='fiftyCents'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input">
                        <label className='label'>
                            20c
                        </label>
                        <input
                            type="number"
                            value={formData.twentyCents}
                            name='twentyCents'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input">
                        <label className='label'>
                            10c
                        </label>
                        <input
                            type="number"
                            value={formData.tenCents}
                            name='tenCents'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input">
                        <label className='label'>
                            5c
                        </label>
                        <input
                            type="number"
                            value={formData.fiveCents}
                            name='fiveCents'
                            onChange={handleChange}
                        />
                    </div>

                    <button className='submit-btn'>Submit</button>
                </form>
                {/* </Toggle.On> */}
            </Toggle>

        </>
    );
}

export default Settings;

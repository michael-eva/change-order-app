// SettingsPage.js
import React, { useState } from 'react';
import useStore from '../store/lowerLimitStore';
import Toggle from '../Toggle';

function Settings() {
    const minimumLimitWarnings = useStore((state) => state.minimumLimitWarnings);
    const [formData, setFormData] = useState(minimumLimitWarnings)

    const handleValueChange = (denomination, event) => {
        const newValue = event.target.value
        // Update the local form data
        setFormData((prevData) =>
            prevData.map((item) =>
                item.denomination === denomination
                    ? { ...item, value: newValue }
                    : item
            )
        );
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        useStore.setState({ minimumLimitWarnings: formData });

        localStorage.setItem(
            'minimumLimitWarnings',
            JSON.stringify(formData)
        );

        // Optionally, you can provide user feedback or perform other actions here
    };

    return (
        <>
            <Toggle>
                <Toggle.Button>Set Limit Warning?</Toggle.Button>
                {/* <Toggle.On> */}
                <form onSubmit={handleSubmit}>
                    {formData.map((item) => (
                        <div key={item.denomination}>
                            <div className="input">
                                <label className='label'>
                                    {` $${item.denomination}:`}
                                </label>
                                <input
                                    type="number"
                                    value={item.value}
                                    onChange={(e) => handleValueChange(item.denomination, e)}
                                />
                            </div>
                        </div>
                    ))}
                    <button className='submit-btn'>Submit</button>
                </form>
                {/* </Toggle.On> */}
            </Toggle>

        </>
    );
}

export default Settings;

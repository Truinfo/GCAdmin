import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const KeySpecs = () => {
    const [keySpecs, setKeySpecs] = useState([]);
    const [error, setError] = useState(null);
    const { modelId } = useParams();

    useEffect(() => {
        const fetchKeySpecs = async () => {
            try {
                const response = await fetch(`https://gocarsmithbackend.onrender.com/api/user/getKeySpecsModel/${modelId}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch key specs');
                }

                const data = await response.json();
                setKeySpecs(data.KeySpecs);
            } catch (error) {
                console.error(error);
                setError(error.message || 'Failed to fetch key specs');
            }
        };

        fetchKeySpecs();
    }, [modelId]);

    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <div><h3>KeySpecs</h3>

                    <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>

                        {keySpecs && keySpecs.map(item =>


                            <div style={{ marginRight: '10px', listStyle: 'none' }}>

                                <li>
                                    <img
                                        src={`https://gocarsmithbackend.onrender.com${item.Image}`}
                                        alt={`${item.name} Image`}
                                        style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '10px' }}
                                    />
                                </li>
                                <li>{item.name}</li>
                                <li>{item.Value}</li>
                            </div>

                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default KeySpecs;

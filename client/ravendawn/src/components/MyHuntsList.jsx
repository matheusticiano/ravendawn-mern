import React, { useState, useEffect } from 'react';
import './MyHuntsList.css';
import newRequest from '../utils/newRequest';
import HuntCard from './HuntCard';


const MyHuntsList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const huntsPerPage = 6;
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await newRequest.get(`hunts/myhunts?sortBy=${sortBy}`);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                setError('Ocorreu um erro ao buscar as hunts.');
                setIsLoading(false);
            }
        };

        fetchData();
    }, [sortBy]);

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };


    // Calcula o índice inicial e final dos hunts a serem exibidos com base na página atual
    const indexOfLastHunt = currentPage * huntsPerPage;
    const indexOfFirstHunt = indexOfLastHunt - huntsPerPage;
    const currentHunts = data.slice(indexOfFirstHunt, indexOfLastHunt);

    // Função para mudar a página
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className='sort'>
                <h6>MY HUNTS</h6>
                <div className='sort-container'>
                    <select className='select-sort' value={sortBy} onChange={handleSortByChange}>
                        <option value="" disabled>Sort By:</option>
                        <option value="profit">Best Profit</option>
                        <option value="xp">Best XP</option>
                        <option value="createdAt">Most Recent</option>
                        <option value="level">Higher Level</option>
                        <option value="likes">Most Likes</option>
                    </select>

                </div>
            </div>
            <div className="hunt-list">
                {isLoading ? (
                    'Loading...'
                ) : error ? (
                    'Something went wrong!'
                ) : (
                    <>
                        {currentHunts.map((hunt) => (
                            <HuntCard
                                key={hunt._id}
                                hunt={hunt.hunt}
                                location={hunt.location}
                                level={hunt.level}
                                image={hunt.image}
                                profit={hunt.profit}
                                xp={hunt.xp}
                                huntId={hunt._id}
                                showMenu={true}
                            />
                        ))}
                    </>
                )}
            </div>
            <div className="pagination">
                {Array.from({ length: Math.ceil(data.length / huntsPerPage) }, (_, i) => (
                    <button key={i + 1} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MyHuntsList;
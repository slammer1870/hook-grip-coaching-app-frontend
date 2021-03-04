import PropTypes from 'prop-types';
import React from 'react';

const Slider = ({ handleDecrement, categories, count, handleIncrement }) => {
    return (
        <div className="flex flex-col p-6 justify-between w-screen bg-white max-w-screen-sm">
            <div className="flex items-center justify-between">
                <button onClick={handleDecrement}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12.2"
                        height="18.8"
                        viewBox="0 0 6.1 9.4">
                        <g
                            id="Symbol_84"
                            data-name="Symbol 84"
                            transform="translate(708.1 -683) rotate(90)">
                            <path
                                id="Path_36"
                                data-name="Path 36"
                                d="M6.7,8.1,2,3.4,3.4,2,6.7,5.3,10,2l1.4,1.4Z"
                                transform="translate(681 700)"
                                fill="#2E2E2E"
                            />
                        </g>
                    </svg>
                </button>

                <h1 className="text-4xl capitalize">{String(categories[count].title)}</h1>

                <button onClick={handleIncrement}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12.2"
                        height="18.8"
                        viewBox="0 0 6.1 9.4">
                        <path
                            id="Path_36"
                            data-name="Path 36"
                            d="M6.7,8.1,2,3.4,3.4,2,6.7,5.3,10,2l1.4,1.4Z"
                            transform="translate(-2 11.4) rotate(-90)"
                            fill="#2E2E2E"
                        />
                    </svg>
                </button>
            </div>
            <ul className="flex justify-between mt-8">
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className={
                            category.title === categories[count].title
                                ? 'w-full mx-1 h-1 bg-black'
                                : 'w-full mx-1 bg-black bg-opacity-25'
                        }></li>
                ))}
            </ul>
        </div>
    );
};

Slider.propTypes = {
    handleDecrement: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object),
    count: PropTypes.number,
    handleIncrement: PropTypes.func.isRequired
};

export default Slider;

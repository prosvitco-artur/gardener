import { useState } from 'react';

const TestComponent = (): JSX.Element => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">
        React компонент працює! ✅
      </h2>
      <p className="text-gray-700 mb-4">
        Це тестовий компонент для перевірки роботи React у Sage 11.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          -
        </button>
        <span className="text-2xl font-bold text-gray-800 min-w-[60px] text-center">
          {count}
        </span>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          +
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-4">
        Натисніть кнопки для зміни значення
      </p>
    </div>
  );
};

export default TestComponent;


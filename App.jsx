  import { useEffect, useState } from "react";
  import './App.css';

  const colors =  [
  'red','blue','green','yellow','teal','purple','orange','pink','cyan','lime'
  ];

  const createDeck = () => {
    const doubledColors = [...colors, ...colors]
    return doubledColors.sort(() => (Math.random() - 0.5))
  };

  const MemoryGame = () => {
    const [deck, setDeck] = useState(createDeck());
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [matched,setMatched] = useState([]);
      

    useEffect(() => {
      if(flippedIndices.length === 2){
        const [firstIndex, secondIndex] = flippedIndices;
        const firstColor = deck[firstIndex];
        const secondColor = deck[secondIndex];

        if(firstColor === secondColor){
          setMatched((prev) => [
            ...prev, firstIndex, secondIndex
          ]);
          setFlippedIndices([])
        } else {
          setDisabled(true);
          setTimeout(() => {
            setFlippedIndices([]);
            setDisabled(false);
          }, 1000)
        }
      }
    }, [flippedIndices, deck]);

    const handleClick = (index) => {
      if(flippedIndices.length < 2 && !flippedIndices.includes
      (index) && !matched.includes(index)){
        setFlippedIndices((prev) => [...prev, index]);
      }  
    };

    return(
      <div className='memory-game'>
        <div className="grid">
          {deck.map((color, index) => (
            <div key={index}
            className={`card ${flippedIndices.includes
              (index)|| matched.includes(index) ? 'flipped'
          : '' }`}
          style={{backgroundColor : flippedIndices.
            includes(index) || matched.includes(index) ?
            color : 'gray'}} 

            onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    );

  };

  export default MemoryGame;
    
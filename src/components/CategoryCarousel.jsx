// import React from 'react';
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
// import { Button } from './ui/button';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setSearchedQuery } from '@/redux/jobSlice';

// const category = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Data Science",
//     "Graphic Designer",
//     "FullStack Developer"
// ]

// const CategoryCarousel = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const searchJobHandler = (query) => {
//         dispatch(setSearchedQuery(query));
//         navigate("/browse");
//     }

//     return (
//         <div>
//             <Carousel className="w-full max-w-xl mx-auto my-20">
//                 <CarouselContent>
//                     {
//                         category.map((cat, index) => (
//                             <CarouselItem className="md:basis-1/2 lg-basis-1/3">
//                                 <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
//                             </CarouselItem>
//                         ))
//                     }
//                 </CarouselContent>
//                 <CarouselPrevious />
//                 <CarouselNext />
//             </Carousel>
//         </div>
//     )
// }

// export default CategoryCarousel
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="w-full px-4 my-10  md:hidden">
      <Carousel className="w-full max-w-6xl mx-auto ">
      <CarouselContent>
  {category.map((cat, index) => (
    <CarouselItem
      key={index}
      className="basis-full sm:basis-1/3 md:basis-1/4 lg:basis-1/5 px-2"
    >
      <Button
        onClick={() => searchJobHandler(cat)}
        variant="outline"
         className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-full 
         px-2 
         sm:px-1
          md:px-1 
          py-3 sm:py-2 
          text-xs sm:text-sm md:text-sm lg:text-base rounded-full truncate mx-auto"
        // className="w-full px-2 sm:px-1 md:px-1 py-3 sm:py-2 text-xs sm:text-sm md:text-sm lg:text-base rounded-full truncate"
        title={cat} // shows full title on hover if truncated
      >
        {cat}
      </Button>
    </CarouselItem>
  ))}
</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;


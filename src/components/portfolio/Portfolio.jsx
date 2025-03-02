import { useEffect, useRef, useState } from "react";
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import itemsForza from "./items/ItemsForza";
import itemsAim from "./items/ItemsAim";
import itemsNova from "./items/ItemsNova";


const Single = ({ item }) => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const handleClick = (e, url) => {
    e.preventDefault();
      const newWindow = window.open(url, "_blank",);
      if (newWindow) {
        newWindow.focus();
      } else {
        alert("Popup blocked! Please allow popups for this site.");
      }
  };

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section >
      <div className="container">
        <div className="wrapper">
          <div className="imageContainer" ref={ref}>
            <img src={item.img} alt="" />
          </div>
          <motion.div className="textContainer" style={{y}}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            <div className="link-article" style={{
              display: "flex",
              gap: "10px"
            }}>
              <button onClick={(e) => handleClick(e,item.linkOne)}>Link{item?.linkTwo ? " 1st article" : " the article"}</button>
              {item?.linkTwo && (
                <button onClick={(e) => handleClick(e,item.linkTwo)}>Link 2nd article</button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = (props) => {
  const ref = useRef();

  const [data, setData] = useState(itemsForza);

  useEffect(()=>{
    switch (props.projectName) {
      case 'Forza Agency':
        setData(itemsForza);
        break;
      case 'AIM Academy':
        setData(itemsAim);
        break;
      case 'Novaon Agency':
        setData(itemsNova);
        break;
      default:
        break;
    }
  },[]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="portfolio" ref={ref}>
      <div className="progress">
        <h1>{props.projectName}</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {data.map((item) => (
        <Single item={item} key={item.id} projectName={props.projectName}/>
      ))}
    </div>
  );
};

export default Portfolio;

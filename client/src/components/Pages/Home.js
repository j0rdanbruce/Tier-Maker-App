/**
 * The Home Page component represent the landing page for the Tier Ranking Application.
 */

const Home = (props) => {
  const { name } = props;
  
  return (
    <div>
      <h1>Home Page</h1>
      <p>{`Hello, ${name}`}</p>
    </div>
    
  );
}

export default Home;
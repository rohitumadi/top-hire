import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { BackgroundLines } from "@/components/ui/background-lines";
import { BorderBeam } from "@/components/ui/border-beam";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { MagicCard } from "@/components/ui/magic-card";
import { companies } from "@/data/comapnies";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
const Home = () => {
  return (
    <BackgroundLines className="flex items-center    justify-center w-full flex-col px-4">
      <main className="flex flex-col   gap-5 sm:gap-8 items-center">
        <header className="text-center">
          <h1 className="sm:text-6xl  font-extrabold text-4xl">TOP HIRE</h1>
        </header>
        <section className="text-center flex flex-col gap-5">
          <h1 className="sm:text-6xl text-4xl">
            A Place Where Top Talent Is Hired
          </h1>
          <h2 className="sm:text-4xl text-2xl"> Your Future Starts Here!</h2>
          <p className="sm:text-2xl text-xl">
            Explore a world of opportunities or find the perfect candidate
          </p>
        </section>

        <div className="flex flex-col sm:flex-row sm:justify-center gap-5 items-center">
          <Link to="/jobs">
            <Button size={"lg"}>Find Jobs</Button>
          </Link>
          <Link to="/post-job">
            <Button size={"lg"}>Post a Job</Button>
          </Link>
        </div>

        <InfiniteMovingCards
          className="bg-neutral-800"
          items={companies}
          speed="slow"
        />

        <section className="flex gap-5 py-4">
          <MagicCard className="w-[350px] ">
            <CardHeader>
              <CardTitle>For Job Seekers</CardTitle>
              <CardDescription>
                Search and apply for jobs,track applications,and more
              </CardDescription>
            </CardHeader>
            <BorderBeam size={250} duration={12} delay={9} />
          </MagicCard>
          <MagicCard className="w-[350px] ">
            <CardHeader>
              <CardTitle>For Recruiters</CardTitle>
              <CardDescription>
                Post Jobs, manage applications and find the best talents
              </CardDescription>
            </CardHeader>
            <BorderBeam size={250} duration={12} delay={9} />
          </MagicCard>
        </section>
      </main>
      <AnimatedGridPattern
        numSquares={100}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
      />
    </BackgroundLines>
  );
};
export default Home;

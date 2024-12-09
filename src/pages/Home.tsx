import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { MagicCard } from "@/components/ui/magic-card";
import { companies } from "@/data/comapnies";
import { faqs } from "@/data/faq";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
const Home = () => {
  return (
    <main className="flex flex-col  gap-5 sm:gap-8 items-center">
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
          <Button size={"lg"} className="btn ">
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-jobs">
          <Button size={"lg"} className="btn">
            Post a Job
          </Button>
        </Link>
      </div>

      <InfiniteMovingCards items={companies} speed="slow" />

      <section className="flex gap-5 py-4">
        <MagicCard className="w-[350px] ">
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
            <CardDescription>
              Search and apply for jobs,track applications,and more
            </CardDescription>
          </CardHeader>
        </MagicCard>
        <MagicCard className="w-[350px] ">
          <CardHeader>
            <CardTitle>For Recruiters</CardTitle>
            <CardDescription>
              Post Jobs, manage applications and find the best talents
            </CardDescription>
          </CardHeader>
        </MagicCard>
      </section>
      <Accordion type="single" collapsible className="w-full py-4">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent className="">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};
export default Home;

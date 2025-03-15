import {Button} from "@/components/ui/button";
import React from "react";

export default function ReferencesPage(): React.JSX.Element {
    return (
        <div className="container mx-auto px-4 py-8 break-words md:break-normal text-primary">
            <h1 className="text-5xl text-center md:text-start md:text-6xl uppercase text-primary font-bold mb-6 border-b-2 pb-6">
                References
            </h1>
            <div className="border-2 rounded-xl bg-background/40 shadow-md p-8 font-medium text-lg flex flex-col gap-2">
                <a href={"/pdf/worklog.pdf"} target="_blank" rel="noopener noreferrer">
                    <Button variant="link" className="underline text-xl p-0">
                        Work Log
                    </Button>
                </a>
                <a href={"/pdf/copyright.pdf"} target="_blank" rel="noopener noreferrer">
                    <Button variant="link" className="underline text-xl p-0">
                        Copyright Checklist
                    </Button>
                </a>
            </div>
            <section className="border-2 p-8 rounded-xl mt-8 bg-background/40 shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                    Technology Stack
                </h2>
                <div className="space-y-2">
                    <p>
                        This website utilizes Next.js 14, a modern React framework
                        optimized for efficiency and fast render times. The application is
                        built with TypeScript for type safety and improved developer
                        experience. For styling, we use TailwindCSS, a utility-first CSS
                        framework allowing for shorthand CSS to be written directly in
                        components, along with the shadcn/ui component library which
                        provides accessible and responsive UI components.
                    </p>

                    <p>
                        For data storage and authentication, we leverage Supabase, an
                        open-source Firebase alternative providing a PostgreSQL database,
                        authentication services, and storage solutions. Payment processing
                        is handled through Stripe's secure payment infrastructure.
                    </p>

                    <p>Additional libraries enhancing our application include:</p>

                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            Framer Motion and Motion for smooth animations and transitions
                        </li>
                        <li>React Hook Form with Zod for form validation</li>
                        <li>React Leaflet for interactive maps</li>
                        <li>Recharts for data visualization</li>
                        <li>React Markdown for rendering markdown content</li>
                        <li>Sonner for toast notifications</li>
                    </ul>
                </div>
            </section>
            <section className="border-2 p-8 rounded-xl mt-8 bg-background/40 shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Images</h2>
                <div className="space-y-2">
                    <p>
                        “A Close up of a Pie on a Table. Key Lime Pie Meringue Topped
                        Tasty.” Picryl,{" "}
                        <a href="https://picryl.com/media/key-lime-pie-meringue-topped-tasty-food-drink-288d8b">
                            https://picryl.com/media/key-lime-pie-meringue-topped-tasty-food-drink-288d8b
                        </a>
                        . Public Domain.
                    </p>
                    <p>
                        Bonda, Max. “Baked Cauliflower on Plate on Table.” Pexels,{" "}
                        <a href="https://www.pexels.com/photo/baked-cauliflower-on-plate-on-table-16311286/">
                            https://www.pexels.com/photo/baked-cauliflower-on-plate-on-table-16311286/
                        </a>
                        . Free to use.
                    </p>
                    <p>
                        “Download Free Image of Chocolate Dessert on an Open Book with a
                        Tea Pot and Tea Cup in the Background.” Rawpixel,{" "}
                        <a href="https://www.rawpixel.com/image/3337193/free-photo-image-bread-and-coffee-coffee-book-images-photos-beverage">
                            https://www.rawpixel.com/image/3337193/free-photo-image-bread-and-coffee-coffee-book-images-photos-beverage
                        </a>
                        . Public Domain.
                    </p>
                    <p>
                        “Golden Pasta Perfection.” Stockcake,{" "}
                        <a href="https://stockcake.com/i/golden-pasta-perfection_1546435_1180626">
                            https://stockcake.com/i/golden-pasta-perfection_1546435_1180626
                        </a>
                        . License varies.
                    </p>
                    <p>
                        “Healthy Salad Plate.” Stockcake,{" "}
                        <a href="https://stockcake.com/i/healthy-salad-plate_609558_950481">
                            https://stockcake.com/i/healthy-salad-plate_609558_950481
                        </a>
                        . License varies.
                    </p>
                    <p>
                        makafood. “Spinach Appetizer in Asian Style.” Pexels,{" "}
                        <a href="https://www.pexels.com/photo/spinach-appetizer-in-asian-style-8954279/">
                            https://www.pexels.com/photo/spinach-appetizer-in-asian-style-8954279/
                        </a>
                        . Free to use.
                    </p>
                    <p>
                        Sh, Nadin. “Baked Bell Pepper.” Pexels,{" "}
                        <a href="https://www.pexels.com/photo/baked-bell-pepper-15747862/">
                            https://www.pexels.com/photo/baked-bell-pepper-15747862/
                        </a>
                        . Free to use.
                    </p>
                    <p>
                        ---. “Eggplant Served in a Restaurant.” Pexels,{" "}
                        <a href="https://www.pexels.com/photo/eggplant-served-in-a-restaurant-19674153/">
                            https://www.pexels.com/photo/eggplant-served-in-a-restaurant-19674153/
                        </a>
                        . Free to use.
                    </p>
                    <p>
                        Bruschetta Image (Openverse): Citation: "Bruschetta." Openverse,
                        Public Domain.
                    </p>
                    <p>
                        Jalapeno Poppers (Flickr): Citation: haydn. "Jalapeno Poppers -
                        Rossi's Fish Bar - Swansea." Flickr,{" "}
                        <a href="https://www.flickr.com/photos/haydn/47474266341">
                            https://www.flickr.com/photos/haydn/47474266341
                        </a>
                        . CC BY 2.0.
                    </p>
                    <p>
                        Coconut Ice Cream (Flickr): Citation: Michelle Peters - Jones.
                        "Coconut Ice Cream." Flickr,{" "}
                        <a href="https://www.flickr.com/photos/foodfootballandababy/6945130989">
                            https://www.flickr.com/photos/foodfootballandababy/6945130989
                        </a>
                        . CC BY 2.0.
                    </p>
                    <p>
                        Banana Bread (Wikimedia Commons): Citation: "Two slices of banana
                        bread on a blue plate, August 2008." Wikimedia Commons,{" "}
                        <a href="https://commons.wikimedia.org/wiki/File:Two_slices_of_banana_bread_on_a_blue_plate,_August_2008.jpg">
                            https://commons.wikimedia.org/wiki/File:Two_slices_of_banana_bread_on_a_blue_plate,_August_2008.jpg
                        </a>
                        . Public Domain.
                    </p>
                    <p>
                        Melanzane alla Parmigiana (Wikimedia Commons): Citation:
                        "Melanzane alla Parmigiana." Wikimedia Commons,{" "}
                        <a href="https://commons.wikimedia.org/wiki/File:Melanzane_alla_Parmigiana.jpg">
                            https://commons.wikimedia.org/wiki/File:Melanzane_alla_Parmigiana.jpg
                        </a>
                        . Public Domain.
                    </p>
                    <p>
                        Onion Rings (Wikimedia Commons): Citation: "Onion Rings."
                        Wikimedia Commons,{" "}
                        <a href="https://commons.wikimedia.org/wiki/File:Onion_Rings_(6202926323).jpg">
                            https://commons.wikimedia.org/wiki/File:Onion_Rings_(6202926323).jpg
                        </a>
                        . CC BY 2.0.
                    </p>
                    <p>
                        Jewish Food Arrangement (Freepik): Citation: Freepik. "Flat-Lay
                        Delicious Jewish Food Arrangement." Freepik,{" "}
                        <a href="https://www.freepik.com/free-photo/flat-lay-delicious-jewish-food-arrangement_12060497.htm">
                            https://www.freepik.com/free-photo/flat-lay-delicious-jewish-food-arrangement_12060497.htm
                        </a>
                        . License varies.
                    </p>
                    <p>
                        "File:NewYorkTimes.Svg - Wikipedia."{" "}
                        <a href="https://commons.wikimedia.org/wiki/File:NewYorkTimes.svg">
                            https://commons.wikimedia.org/wiki/File:NewYorkTimes.svg
                        </a>
                        . Accessed 14 Mar. 2025.
                    </p>
                    <p>
                        "File:The Guardian 2018.Svg - Wikipedia." 14 Jan. 2018,{" "}
                        <a href="https://commons.wikimedia.org/wiki/File:The_Guardian_2018.svg">
                            https://commons.wikimedia.org/wiki/File:The_Guardian_2018.svg
                        </a>
                        .
                    </p>
                    <p>
                        "Forbes." Wikipedia, 9 Mar. 2025. Wikipedia,{" "}
                        <a href="https://en.wikipedia.org/w/index.php?title=Forbes&oldid=1279515933">
                            https://en.wikipedia.org/w/index.php?title=Forbes&oldid=1279515933
                        </a>
                        .
                    </p>
                    <p>
                        "Los Angeles Times." Wikipedia, 9 Mar. 2025. Wikipedia,{" "}
                        <a href="https://en.wikipedia.org/w/index.php?title=Los_Angeles_Times&oldid=1279533901">
                            https://en.wikipedia.org/w/index.php?title=Los_Angeles_Times&oldid=1279533901
                        </a>
                        .
                    </p>
                    <p>
                        "The Washington Post." Wikipedia, 12 Mar. 2025. Wikipedia,{" "}
                        <a href="https://en.wikipedia.org/w/index.php?title=The_Washington_Post&oldid=1280126128">
                            https://en.wikipedia.org/w/index.php?title=The_Washington_Post&oldid=1280126128
                        </a>
                        .
                    </p>
                    <p>
                        "Today (American TV Program)." Wikipedia, 12 Mar. 2025. Wikipedia,{" "}
                        <a href="https://en.wikipedia.org/w/index.php?title=Today_(American_TV_program)&oldid=1280045088">
                            https://en.wikipedia.org/w/index.php?title=Today_(American_TV_program)&oldid=1280045088
                        </a>
                        .
                    </p>
                    <p>
                        “Doodle Freehand Sketch Drawing of Carrot” Vecteezy,
                        https://www.vecteezy.com/png/15714978-doodle-freehand-sketch-drawing-of-carrot.
                        Accessed 15 Mar. 2025.{" "}
                        <a href="https://www.vecteezy.com/free-png/carrot">
                            Carrot PNGs by Vecteezy
                        </a>
                    </p>
                    <p>
                        ---. Photo by Anne Nygård on Unsplash. 26 Jan. 2020,
                        https://unsplash.com/photos/white-clouds-in-blue-sky-vc-vPgGqAr4.
                    </p>{" "}
                    <p>
                        ---. Photo by Arisa Chattasa on Unsplash. 9 July 2019,
                        https://unsplash.com/photos/white-printer-paper-close-up-photography-0LaBRkmH4fM.
                    </p>
                    <p>
                        ---. Photo by Chris Johnson on Unsplash. 27 May 2019,
                        https://unsplash.com/photos/city-buildings-during-daytime-0qNDaCqKXNo.
                    </p>
                    <p>
                        ---. Photo by Frances Gunn on Unsplash. 14 Oct. 2015,
                        https://unsplash.com/photos/barn-surrounded-by-trees-QcBAZ7VREHQ.
                    </p>{" "}
                    <p>
                        ---. Photo by Jonathan Borba on Unsplash. 26 Feb. 2019,
                        https://unsplash.com/photos/person-slicing-vegetable-uB7q7aipU2o.
                    </p>{" "}
                    <p>
                        ---. Photo by Kevin Doran on Unsplash. 5 Aug. 2020,
                        https://unsplash.com/photos/sliced-cucumber-and-green-vegetable-on-brown-wooden-chopping-board-PBt7ok7ygt0.
                    </p>
                    <p>
                        ---. Photo by Noah Buscher on Unsplash. 19 Nov. 2018,
                        https://unsplash.com/photos/green-plant-x8ZStukS2PM.
                    </p>
                    <p>
                        ---. Photo by Michael Bourgault on Unsplash. 12 Aug. 2018,
                        https://unsplash.com/photos/barn-on-green-field-YvvHEQNgMcU.
                    </p>
                    <p>
                        ---. Photo by Sparks Johnson on Unsplash. 2 Dec. 2017,
                        https://unsplash.com/photos/shed-in-the-middle-of-field-b2PAEIr4NK8.
                    </p>
                    <p>
                        ---. Photo by Benjamin Davies on Unsplash. 18 May 2017,
                        https://unsplash.com/photos/landscape-photography-of-field-Zm2n2O7Fph4.
                    </p>
                    <p>
                        Coconut Ice Cream (Freepik): Citation: Freepik. "Coconut Ice Cream
                        Foo" Freepik,{" "}
                        <a href="https://www.freepik.com/free-photo/summer-dessert-ice-cream-ice-cream-with-coconut_41131096.htm">
                            https://www.freepik.com/free-photo/summer-dessert-ice-cream-ice-cream-with-coconut_41131096.htm
                        </a>
                        . License varies.
                    </p>
                </div>
            </section>
            <section className="border-2 p-8 rounded-xl mt-4 bg-background/40 shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Research</h2>
                <div className="space-y-2">
                    <p>
                        “Animal vs. Plant Proteins: Which Is Better for Your Health?”
                        Verywell Health,{" "}
                        <a href="https://www.verywellhealth.com/plant-protein-vs-animal-protein-8781023">
                            https://www.verywellhealth.com/plant-protein-vs-animal-protein-8781023
                        </a>
                        . Accessed 13 Mar. 2025.
                    </p>

                    <p>
                        Campbell, Denis, and Denis Campbell Health policy editor.
                        “Plant-Based Meat Alternatives Are Eco-Friendlier and Mostly
                        Healthier, Study Finds.” The Guardian, 27 Aug. 2024. The Guardian,{" "}
                        <a href="https://www.theguardian.com/business/article/2024/aug/28/plant-based-meat-alternatives-environment-nutrition">
                            https://www.theguardian.com/business/article/2024/aug/28/plant-based-meat-alternatives-environment-nutrition
                        </a>
                        .
                    </p>

                    <p>
                        Carbon Footprint Factsheet | Center for Sustainable Systems.{" "}
                        <a href="https://css.umich.edu/publications/factsheets/sustainability-indicators/carbon-footprint-factsheet">
                            https://css.umich.edu/publications/factsheets/sustainability-indicators/carbon-footprint-factsheet
                        </a>
                        . Accessed 13 Mar. 2025.
                    </p>

                    <p>
                        Carbon Footprint of Food | Green Eatz. 24 Jan. 2013,{" "}
                        <a href="https://www.greeneatz.com/foods-carbon-footprint.html">
                            https://www.greeneatz.com/foods-carbon-footprint.html
                        </a>
                        .
                    </p>

                    <p>
                        Carrington, Damian. “'Insanely Tasty Green Food': How the Meaty
                        Danes Embraced a World-First Plant-Based Plan.” The Guardian, 31
                        Jan. 2025. The Guardian,{" "}
                        <a href="https://www.theguardian.com/environment/2025/jan/31/more-carrot-less-stick-how-meat-loving-danes-were-sold-a-plant-led-world-first">
                            https://www.theguardian.com/environment/2025/jan/31/more-carrot-less-stick-how-meat-loving-danes-were-sold-a-plant-led-world-first
                        </a>
                        .
                    </p>

                    <p>
                        Climate Impact of Meat, Vegetarian and Vegan Diets | Ethical
                        Consumer. 14 Feb. 2020,{" "}
                        <a href="https://www.ethicalconsumer.org/food-drink/climate-impact-meat-vegetarian-vegan-diets">
                            https://www.ethicalconsumer.org/food-drink/climate-impact-meat-vegetarian-vegan-diets
                        </a>
                        .
                    </p>

                    <p>
                        Could Going Vegan Help Reduce Greenhouse Gas Emissions? | Stanford
                        Doerr School of Sustainability. 2 Feb. 2022,{" "}
                        <a href="https://sustainability.stanford.edu/news/could-going-vegan-help-reduce-greenhouse-gas-emissions">
                            https://sustainability.stanford.edu/news/could-going-vegan-help-reduce-greenhouse-gas-emissions
                        </a>
                        .
                    </p>

                    <p>
                        Edwards, Megan. “New Study Reveals Vegan Diets Generate 75% Less
                        Greenhouse Gases Than Meat-Heavy Diets.” Forks Over Knives, 31
                        July 2023,{" "}
                        <a href="https://www.forksoverknives.com/wellness/new-study-vegan-diets-generate-75-less-greenhouse-gases-than-meat-heavy-diets/">
                            https://www.forksoverknives.com/wellness/new-study-vegan-diets-generate-75-less-greenhouse-gases-than-meat-heavy-diets/
                        </a>
                        .
                    </p>

                    <p>
                        Environmental Impacts of Alternative Proteins | GFI.{" "}
                        <a href="https://gfi.org/resource/environmental-impacts-of-alternative-proteins/">
                            https://gfi.org/resource/environmental-impacts-of-alternative-proteins/
                        </a>
                        . Accessed 13 Mar. 2025.
                    </p>

                    <p>
                        “Environmental Vegetarianism.” Wikipedia, 18 Feb. 2025. Wikipedia,{" "}
                        <a href="https://en.wikipedia.org/w/index.php?title=Environmental_vegetarianism&oldid=1276386167">
                            https://en.wikipedia.org/w/index.php?title=Environmental_vegetarianism&oldid=1276386167
                        </a>
                        .
                    </p>

                    <p>
                        Gibbs, Joshua, and Francesco P. Cappuccio. “Plant-Based Dietary
                        Patterns for Human and Planetary Health.” Nutrients, vol. 14, no.
                        8, Apr. 2022, p. 1614. PubMed Central,{" "}
                        <a href="https://doi.org/10.3390/nu14081614">
                            https://doi.org/10.3390/nu14081614
                        </a>
                        .
                    </p>

                    <p>
                        Goodman, Daisy Dunne, Tom Prater and Joe. Interactive: What Is the
                        Climate Impact of Eating Meat and Dairy?{" "}
                        <a href="https://interactive.carbonbrief.org/what-is-the-climate-impact-of-eating-meat-and-dairy/url">
                            https://interactive.carbonbrief.org/what-is-the-climate-impact-of-eating-meat-and-dairy/url
                        </a>
                        . Accessed 13 Mar. 2025.
                    </p>

                    <p>
                        “How to Reduce Your Carbon Footprint with Food.” A Healthier
                        Michigan, 14 Sept. 2023,{" "}
                        <a href="https://ahealthiermichigan.org/stories/podcast/how-to-reduce-your-carbon-footprint-with-food">
                            https://ahealthiermichigan.org/stories/podcast/how-to-reduce-your-carbon-footprint-with-food
                        </a>
                        .
                    </p>

                    <p>
                        Long, Yin, et al. “Carbon Footprint and Embodied Nutrition
                        Evaluation of 388 Recipes.” Scientific Data, vol. 10, Nov. 2023,
                        p. 794. PubMed Central,{" "}
                        <a href="https://doi.org/10.1038/s41597-023-02702-1">
                            https://doi.org/10.1038/s41597-023-02702-1
                        </a>
                        .
                    </p>

                    <p>
                        “Low-Carbon Diet.” Wikipedia, 12 Nov. 2024. Wikipedia,{" "}
                        <a href="https://en.wikipedia.org/w/index.php?title=Low-carbon_diet&oldid=1256880307">
                            https://en.wikipedia.org/w/index.php?title=Low-carbon_diet&oldid=1256880307
                        </a>
                        .
                    </p>

                    <p>
                        “Plant-Based Diet.” Wikipedia, 13 Mar. 2025. Wikipedia,{" "}
                        <a href="https://en.wikipedia.org/w/index.php?title=Plant-based_diet&oldid=1280211832">
                            https://en.wikipedia.org/w/index.php?title=Plant-based_diet&oldid=1280211832
                        </a>
                        .
                    </p>

                    <p>
                        Ritchie, Hannah. Are Meat Substitutes Really Better for the
                        Environment than Meat?{" "}
                        <a href="https://www.sustainabilitybynumbers.com/p/carbon-footprint-meat-substitutes">
                            https://www.sustainabilitybynumbers.com/p/carbon-footprint-meat-substitutes
                        </a>
                        . Accessed 13 Mar. 2025.
                    </p>

                    <p>
                        Scarborough, Peter, et al. “Vegans, Vegetarians, Fish-Eaters and
                        Meat-Eaters in the UK Show Discrepant Environmental Impacts.”
                        Nature Food, vol. 4, no. 7, July 2023, pp. 565–74. www.nature.com,{" "}
                        <a href="https://doi.org/10.1038/s43016-023-00795-w">
                            https://doi.org/10.1038/s43016-023-00795-w
                        </a>
                        .
                    </p>

                    <p>
                        “The Case for Plant Based.” UCLA Sustainability,{" "}
                        <a href="https://www.sustain.ucla.edu/food-systems/the-case-for-plant-based/">
                            https://www.sustain.ucla.edu/food-systems/the-case-for-plant-based/
                        </a>
                        . Accessed 13 Mar. 2025.
                    </p>

                    <p>
                        “What to Eat on a Whole Food, Plant-Based Diet.” Verywell Health,{" "}
                        <a href="https://www.verywellhealth.com/whole-food-plant-based-diet-8723867">
                            https://www.verywellhealth.com/whole-food-plant-based-diet-8723867
                        </a>
                        . Accessed 13 Mar. 2025.
                    </p>
                </div>
            </section>
            <section className="border-2 p-8 rounded-xl mt-4 bg-background/40 shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Recipes</h2>
                <div className="space-y-2">
                    <p>
                        Andrews, Alison. “The Best Vegan Mac and Cheese (Classic, Baked).”
                        Loving It Vegan, 12 Feb. 2019,{" "}
                        <a href="https://lovingitvegan.com/baked-vegan-mac-and-cheese/">
                            https://lovingitvegan.com/baked-vegan-mac-and-cheese/
                        </a>
                        .
                    </p>

                    <p>
                        Baker, Dana @. Minimalist. “Vegan Jalapeño Poppers.” Minimalist
                        Baker, 1 Apr. 2014,{" "}
                        <a href="https://minimalistbaker.com/vegan-jalapeno-poppers/">
                            https://minimalistbaker.com/vegan-jalapeno-poppers/
                        </a>
                        .
                    </p>

                    <p>
                        Brunmeier, Valerie. “Chocolate Chip Banana Bread.” Valerie's
                        Kitchen, 14 Sept. 2023,{" "}
                        <a href="https://www.fromvalerieskitchen.com/sour-cream-chocolate-chip-banana-bread/">
                            https://www.fromvalerieskitchen.com/sour-cream-chocolate-chip-banana-bread/
                        </a>
                        .
                    </p>

                    <p>
                        Cauchon, Sara Lynn. “Chocolate Avocado Mousse.” The Domestic Geek,
                        8 Nov. 2021,{" "}
                        <a href="https://thedomesticgeek.com/chocolate-avocado-mousse/">
                            https://thedomesticgeek.com/chocolate-avocado-mousse/
                        </a>
                        .
                    </p>

                    <p>
                        “Chimichurri Cauliflower Steak.” Inspired Taste - Easy Recipes for
                        Home Cooks,{" "}
                        <a href="https://www.inspiredtaste.net/48013/chimichurri-cauliflower-steaks/">
                            https://www.inspiredtaste.net/48013/chimichurri-cauliflower-steaks/
                        </a>
                        . Accessed 13 Mar. 2025.
                    </p>

                    <p>
                        “Chocolate Soufflé Cake Recipe.” NYT Cooking,{" "}
                        <a href="https://cooking.nytimes.com/recipes/1023886-chocolate-souffle-cake">
                            https://cooking.nytimes.com/recipes/1023886-chocolate-souffle-cake
                        </a>
                        . Accessed 13 Mar. 2025.
                    </p>

                    <p>
                        “Grandma's Lemon Meringue Pie.” Allrecipes,{" "}
                        <a href="https://www.allrecipes.com/recipe/15093/grandmas-lemon-meringue-pie/">
                            https://www.allrecipes.com/recipe/15093/grandmas-lemon-meringue-pie/
                        </a>
                        . Accessed 13 Mar. 2025.
                    </p>

                    <p>
                        Macey, Deryn. “Easy Vegan Bruschetta Recipe.” Running on Real
                        Food, 20 Nov. 2019,{" "}
                        <a href="https://runningonrealfood.com/easy-vegan-bruschetta/">
                            https://runningonrealfood.com/easy-vegan-bruschetta/
                        </a>
                        .
                    </p>

                    <p>
                        Nisha. “The Best Vegan Mushroom Risotto.” Rainbow Plant Life, 19
                        Jan. 2020,{" "}
                        <a href="https://rainbowplantlife.com/vegan-miso-butter-mushroom-risotto/">
                            https://rainbowplantlife.com/vegan-miso-butter-mushroom-risotto/
                        </a>
                        .
                    </p>

                    <p>
                        Nora. “The Best & Easiest Vegan Spinach Artichoke Dip.” Nora
                        Cooks, 15 Nov. 2018,{" "}
                        <a href="https://www.noracooks.com/vegan-spinach-artichoke-dip/">
                            https://www.noracooks.com/vegan-spinach-artichoke-dip/
                        </a>
                        .
                    </p>

                    <p>
                        Saladino, Emily. “Eggplant Parmesan.” Food Network, Warner Bros,{" "}
                        <a href="https://www.foodnetwork.com/recipes/food-network-kitchen/eggplant-parmesan-recipe-2008982">
                            https://www.foodnetwork.com/recipes/food-network-kitchen/eggplant-parmesan-recipe-2008982
                        </a>
                        .
                    </p>

                    <p>
                        Shoemaker, Caitlin. “Healthy Vegan Onion Rings (Fat Free!).” From
                        My Bowl, 18 Jan. 2018,{" "}
                        <a href="https://frommybowl.com/healthy-vegan-onion-rings/">
                            https://frommybowl.com/healthy-vegan-onion-rings/
                        </a>
                        .
                    </p>

                    <p>
                        Sina. “Vegan Meatballs with Spaghetti.” Vegan Heaven, 12 Nov.
                        2020,{" "}
                        <a href="https://veganheaven.org/recipe/spaghetti-with-bean-balls/">
                            https://veganheaven.org/recipe/spaghetti-with-bean-balls/
                        </a>
                        .
                    </p>

                    <p>
                        “Spinach Balls.” Allrecipes,{" "}
                        <a href="https://www.allrecipes.com/recipe/25273/spinach-balls/">
                            https://www.allrecipes.com/recipe/25273/spinach-balls/
                        </a>
                        . Accessed 13 Mar. 2025.
                    </p>

                    <p>
                        Taylor, Kathryne. “Best Vegetable Lasagna.” Cookie and Kate, 7
                        Dec. 2017,{" "}
                        <a href="https://cookieandkate.com/best-vegetable-lasagna-recipe/">
                            https://cookieandkate.com/best-vegetable-lasagna-recipe/
                        </a>
                        .
                    </p>

                    <p>
                        “The Best Caesar Salad.” Food Network, Warner Bros,{" "}
                        <a href="https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-caesar-salad-8037173">
                            https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-caesar-salad-8037173
                        </a>
                        .
                    </p>

                    <p>
                        “This Vegetarian-Friendly Black Bean Burger Is So Delicious.” The
                        Pioneer Woman, 22 Sept. 2014,{" "}
                        <a href="https://www.thepioneerwoman.com/food-cooking/recipes/a11831/black-bean-burger/">
                            https://www.thepioneerwoman.com/food-cooking/recipes/a11831/black-bean-burger/
                        </a>
                        .
                    </p>

                    <p>
                        “Vegetarian Stuffed Peppers.” Taste of Home,{" "}
                        <a href="https://www.tasteofhome.com/recipes/vegetarian-stuffed-peppers/">
                            https://www.tasteofhome.com/recipes/vegetarian-stuffed-peppers/
                        </a>
                        . Accessed 13 Mar. 2025.
                    </p>
                </div>
            </section>
        </div>
    );
}

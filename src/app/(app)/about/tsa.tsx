import {Button} from "@/components/ui/button";
import {
    MorphingDialog,
    MorphingDialogContainer,
    MorphingDialogContent,
    MorphingDialogDescription,
    MorphingDialogImage,
    MorphingDialogTitle,
    MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog";
import {PlusIcon} from "lucide-react";
import React from "react";

const Tsa = (): React.ReactNode => {
    return (
        <MorphingDialog>
            <MorphingDialogTrigger
                style={{
                    borderRadius: "12px",
                }}
                className="flex flex-col overflow-hidden border"
            >
                <MorphingDialogImage
                    src="/about/tsa.jpg"
                    alt="our story"
                    className="h-56 w-full object-cover"
                />
                <div className="flex grow flex-row items-center justify-between px-3 py-3 border-t">
                    <div>
                        <MorphingDialogTitle className="text-xl font-semibold text-primary">
                            TSA INFO
                        </MorphingDialogTitle>
                    </div>
                    <button
                        type="button"
                        className="relative ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border text-primary hover:bg-primary/10 transition-all"
                        aria-label="Open dialog"
                    >
                        <PlusIcon size={12} />
                    </button>
                </div>
            </MorphingDialogTrigger>
            <MorphingDialogContainer className="relative">
                <MorphingDialogContent
                    style={{
                        borderRadius: "24px",
                    }}
                    className="pointer-events-auto relative flex h-auto w-full flex-col border-2 bg-background max-w-[400px] md:max-w-[900px] max-h-[400px] md:max-h-[800px]  overflow-auto p-6"
                >
                    <MorphingDialogImage
                        src="/about/tsa.jpg"
                        alt="our story"
                        className="h-[500px] w-full object-cover rounded-2xl border-2"
                    />
                    <div className="py-8 px-2">
                        <MorphingDialogTitle className="text-4xl font-bold text-primary">
                            TSA INFO
                        </MorphingDialogTitle>
                        <MorphingDialogDescription
                            disableLayoutAnimation
                            variants={{
                                initial: {opacity: 0, scale: 0.8, y: 100},
                                animate: {opacity: 1, scale: 1, y: 0},
                                exit: {opacity: 0, scale: 0.8, y: 100},
                            }}
                            className="mt-6"
                        >
                            <a
                                href={"/pdf/worklog.pdf"}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="link" className="underline text-xl p-0">
                                    Work Log
                                </Button>
                            </a>
                            <div className="mt-12">
                                <div className="text-3xl font-semibold text-primary">
                                    References
                                </div>
                                <section className="border-2 p-6 rounded-xl mt-4 bg-green-50">
                                    <h2 className="text-2xl font-semibold mb-4 text-primary">
                                        Research
                                    </h2>
                                    <div className="space-y-2">
                                        <p>
                                            “Animal vs. Plant Proteins: Which Is Better
                                            for Your Health?” Verywell Health,{" "}
                                            <a href="https://www.verywellhealth.com/plant-protein-vs-animal-protein-8781023">
                                                https://www.verywellhealth.com/plant-protein-vs-animal-protein-8781023
                                            </a>
                                            . Accessed 13 Mar. 2025.
                                        </p>

                                        <p>
                                            Campbell, Denis, and Denis Campbell Health
                                            policy editor. “Plant-Based Meat Alternatives
                                            Are Eco-Friendlier and Mostly Healthier, Study
                                            Finds.” The Guardian, 27 Aug. 2024. The
                                            Guardian,{" "}
                                            <a href="https://www.theguardian.com/business/article/2024/aug/28/plant-based-meat-alternatives-environment-nutrition">
                                                https://www.theguardian.com/business/article/2024/aug/28/plant-based-meat-alternatives-environment-nutrition
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Carbon Footprint Factsheet | Center for
                                            Sustainable Systems.{" "}
                                            <a href="https://css.umich.edu/publications/factsheets/sustainability-indicators/carbon-footprint-factsheet">
                                                https://css.umich.edu/publications/factsheets/sustainability-indicators/carbon-footprint-factsheet
                                            </a>
                                            . Accessed 13 Mar. 2025.
                                        </p>

                                        <p>
                                            Carbon Footprint of Food | Green Eatz. 24 Jan.
                                            2013,{" "}
                                            <a href="https://www.greeneatz.com/foods-carbon-footprint.html">
                                                https://www.greeneatz.com/foods-carbon-footprint.html
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Carrington, Damian. “‘Insanely Tasty Green
                                            Food’: How the Meaty Danes Embraced a
                                            World-First Plant-Based Plan.” The Guardian,
                                            31 Jan. 2025. The Guardian,{" "}
                                            <a href="https://www.theguardian.com/environment/2025/jan/31/more-carrot-less-stick-how-meat-loving-danes-were-sold-a-plant-led-world-first">
                                                https://www.theguardian.com/environment/2025/jan/31/more-carrot-less-stick-how-meat-loving-danes-were-sold-a-plant-led-world-first
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Climate Impact of Meat, Vegetarian and Vegan
                                            Diets | Ethical Consumer. 14 Feb. 2020,{" "}
                                            <a href="https://www.ethicalconsumer.org/food-drink/climate-impact-meat-vegetarian-vegan-diets">
                                                https://www.ethicalconsumer.org/food-drink/climate-impact-meat-vegetarian-vegan-diets
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Could Going Vegan Help Reduce Greenhouse Gas
                                            Emissions? | Stanford Doerr School of
                                            Sustainability. 2 Feb. 2022,{" "}
                                            <a href="https://sustainability.stanford.edu/news/could-going-vegan-help-reduce-greenhouse-gas-emissions">
                                                https://sustainability.stanford.edu/news/could-going-vegan-help-reduce-greenhouse-gas-emissions
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Edwards, Megan. “New Study Reveals Vegan Diets
                                            Generate 75% Less Greenhouse Gases Than
                                            Meat-Heavy Diets.” Forks Over Knives, 31 July
                                            2023,{" "}
                                            <a href="https://www.forksoverknives.com/wellness/new-study-vegan-diets-generate-75-less-greenhouse-gases-than-meat-heavy-diets/">
                                                https://www.forksoverknives.com/wellness/new-study-vegan-diets-generate-75-less-greenhouse-gases-than-meat-heavy-diets/
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Environmental Impacts of Alternative Proteins
                                            | GFI.{" "}
                                            <a href="https://gfi.org/resource/environmental-impacts-of-alternative-proteins/">
                                                https://gfi.org/resource/environmental-impacts-of-alternative-proteins/
                                            </a>
                                            . Accessed 13 Mar. 2025.
                                        </p>

                                        <p>
                                            “Environmental Vegetarianism.” Wikipedia, 18
                                            Feb. 2025. Wikipedia,{" "}
                                            <a href="https://en.wikipedia.org/w/index.php?title=Environmental_vegetarianism&oldid=1276386167">
                                                https://en.wikipedia.org/w/index.php?title=Environmental_vegetarianism&oldid=1276386167
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Gibbs, Joshua, and Francesco P. Cappuccio.
                                            “Plant-Based Dietary Patterns for Human and
                                            Planetary Health.” Nutrients, vol. 14, no. 8,
                                            Apr. 2022, p. 1614. PubMed Central,{" "}
                                            <a href="https://doi.org/10.3390/nu14081614">
                                                https://doi.org/10.3390/nu14081614
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Goodman, Daisy Dunne, Tom Prater and Joe.
                                            Interactive: What Is the Climate Impact of
                                            Eating Meat and Dairy?{" "}
                                            <a href="https://interactive.carbonbrief.org/what-is-the-climate-impact-of-eating-meat-and-dairy/url">
                                                https://interactive.carbonbrief.org/what-is-the-climate-impact-of-eating-meat-and-dairy/url
                                            </a>
                                            . Accessed 13 Mar. 2025.
                                        </p>

                                        <p>
                                            “How to Reduce Your Carbon Footprint with
                                            Food.” A Healthier Michigan, 14 Sept. 2023,{" "}
                                            <a href="https://ahealthiermichigan.org/stories/podcast/how-to-reduce-your-carbon-footprint-with-food">
                                                https://ahealthiermichigan.org/stories/podcast/how-to-reduce-your-carbon-footprint-with-food
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Long, Yin, et al. “Carbon Footprint and
                                            Embodied Nutrition Evaluation of 388 Recipes.”
                                            Scientific Data, vol. 10, Nov. 2023, p. 794.
                                            PubMed Central,{" "}
                                            <a href="https://doi.org/10.1038/s41597-023-02702-1">
                                                https://doi.org/10.1038/s41597-023-02702-1
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            “Low-Carbon Diet.” Wikipedia, 12 Nov. 2024.
                                            Wikipedia,{" "}
                                            <a href="https://en.wikipedia.org/w/index.php?title=Low-carbon_diet&oldid=1256880307">
                                                https://en.wikipedia.org/w/index.php?title=Low-carbon_diet&oldid=1256880307
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            “Plant-Based Diet.” Wikipedia, 13 Mar. 2025.
                                            Wikipedia,{" "}
                                            <a href="https://en.wikipedia.org/w/index.php?title=Plant-based_diet&oldid=1280211832">
                                                https://en.wikipedia.org/w/index.php?title=Plant-based_diet&oldid=1280211832
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Ritchie, Hannah. Are Meat Substitutes Really
                                            Better for the Environment than Meat?{" "}
                                            <a href="https://www.sustainabilitybynumbers.com/p/carbon-footprint-meat-substitutes">
                                                https://www.sustainabilitybynumbers.com/p/carbon-footprint-meat-substitutes
                                            </a>
                                            . Accessed 13 Mar. 2025.
                                        </p>

                                        <p>
                                            Scarborough, Peter, et al. “Vegans,
                                            Vegetarians, Fish-Eaters and Meat-Eaters in
                                            the UK Show Discrepant Environmental Impacts.”
                                            Nature Food, vol. 4, no. 7, July 2023, pp.
                                            565–74. www.nature.com,{" "}
                                            <a href="https://doi.org/10.1038/s43016-023-00795-w">
                                                https://doi.org/10.1038/s43016-023-00795-w
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            “The Case for Plant Based.” UCLA
                                            Sustainability,{" "}
                                            <a href="https://www.sustain.ucla.edu/food-systems/the-case-for-plant-based/">
                                                https://www.sustain.ucla.edu/food-systems/the-case-for-plant-based/
                                            </a>
                                            . Accessed 13 Mar. 2025.
                                        </p>

                                        <p>
                                            “What to Eat on a Whole Food, Plant-Based
                                            Diet.” Verywell Health,{" "}
                                            <a href="https://www.verywellhealth.com/whole-food-plant-based-diet-8723867">
                                                https://www.verywellhealth.com/whole-food-plant-based-diet-8723867
                                            </a>
                                            . Accessed 13 Mar. 2025.
                                        </p>
                                    </div>
                                </section>
                                <section className="border-2 p-6 rounded-xl mt-4 bg-green-50">
                                    <h2 className="text-2xl font-semibold mb-4 text-primary">
                                        Recipes
                                    </h2>
                                    <div className="space-y-2">
                                        <p>
                                            Aimee. “Coconut Ice Cream.” Like Mother, Like
                                            Daughter, 6 May 2019,{" "}
                                            <a href="https://lmld.org/coconut-ice-cream/">
                                                https://lmld.org/coconut-ice-cream/
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Andrews, Alison. “The Best Vegan Mac and
                                            Cheese (Classic, Baked).” Loving It Vegan, 12
                                            Feb. 2019,{" "}
                                            <a href="https://lovingitvegan.com/baked-vegan-mac-and-cheese/">
                                                https://lovingitvegan.com/baked-vegan-mac-and-cheese/
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Baker, Dana @. Minimalist. “Vegan Jalapeño
                                            Poppers.” Minimalist Baker, 1 Apr. 2014,{" "}
                                            <a href="https://minimalistbaker.com/vegan-jalapeno-poppers/">
                                                https://minimalistbaker.com/vegan-jalapeno-poppers/
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Brunmeier, Valerie. “Chocolate Chip Banana
                                            Bread.” Valerie’s Kitchen, 14 Sept. 2023,{" "}
                                            <a href="https://www.fromvalerieskitchen.com/sour-cream-chocolate-chip-banana-bread/">
                                                https://www.fromvalerieskitchen.com/sour-cream-chocolate-chip-banana-bread/
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Cauchon, Sara Lynn. “Chocolate Avocado
                                            Mousse.” The Domestic Geek, 8 Nov. 2021,{" "}
                                            <a href="https://thedomesticgeek.com/chocolate-avocado-mousse/">
                                                https://thedomesticgeek.com/chocolate-avocado-mousse/
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            “Chimichurri Cauliflower Steak.” Inspired
                                            Taste - Easy Recipes for Home Cooks,{" "}
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
                                            “Grandma’s Lemon Meringue Pie.” Allrecipes,{" "}
                                            <a href="https://www.allrecipes.com/recipe/15093/grandmas-lemon-meringue-pie/">
                                                https://www.allrecipes.com/recipe/15093/grandmas-lemon-meringue-pie/
                                            </a>
                                            . Accessed 13 Mar. 2025.
                                        </p>

                                        <p>
                                            Macey, Deryn. “Easy Vegan Bruschetta Recipe.”
                                            Running on Real Food, 20 Nov. 2019,{" "}
                                            <a href="https://runningonrealfood.com/easy-vegan-bruschetta/">
                                                https://runningonrealfood.com/easy-vegan-bruschetta/
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Nisha. “The Best Vegan Mushroom Risotto.”
                                            Rainbow Plant Life, 19 Jan. 2020,{" "}
                                            <a href="https://rainbowplantlife.com/vegan-miso-butter-mushroom-risotto/">
                                                https://rainbowplantlife.com/vegan-miso-butter-mushroom-risotto/
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Nora. “The Best & Easiest Vegan Spinach
                                            Artichoke Dip.” Nora Cooks, 15 Nov. 2018,{" "}
                                            <a href="https://www.noracooks.com/vegan-spinach-artichoke-dip/">
                                                https://www.noracooks.com/vegan-spinach-artichoke-dip/
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Saladino, Emily. “Eggplant Parmesan.” Food
                                            Network, Warner Bros,{" "}
                                            <a href="https://www.foodnetwork.com/recipes/food-network-kitchen/eggplant-parmesan-recipe-2008982">
                                                https://www.foodnetwork.com/recipes/food-network-kitchen/eggplant-parmesan-recipe-2008982
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Shoemaker, Caitlin. “Healthy Vegan Onion Rings
                                            (Fat Free!).” From My Bowl, 18 Jan. 2018,{" "}
                                            <a href="https://frommybowl.com/healthy-vegan-onion-rings/">
                                                https://frommybowl.com/healthy-vegan-onion-rings/
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Sina. “Vegan Meatballs with Spaghetti.” Vegan
                                            Heaven, 12 Nov. 2020,{" "}
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
                                            Taylor, Kathryne. “Best Vegetable Lasagna.”
                                            Cookie and Kate, 7 Dec. 2017,{" "}
                                            <a href="https://cookieandkate.com/best-vegetable-lasagna-recipe/">
                                                https://cookieandkate.com/best-vegetable-lasagna-recipe/
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            “The Best Caesar Salad.” Food Network, Warner
                                            Bros,{" "}
                                            <a href="https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-caesar-salad-8037173">
                                                https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-caesar-salad-8037173
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            “This Vegetarian-Friendly Black Bean Burger Is
                                            So Delicious.” The Pioneer Woman, 22 Sept.
                                            2014,{" "}
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
                                <section className="border-2 p-6 rounded-xl mt-4 bg-green-50">
                                    <h2 className="text-2xl font-semibold mb-4 text-primary">
                                        Images
                                    </h2>
                                    <div className="space-y-2">
                                        <p>
                                            “A Close up of a Pie on a Table. Key Lime Pie
                                            Meringue Topped Tasty.” Picryl,{" "}
                                            <a href="https://picryl.com/media/key-lime-pie-meringue-topped-tasty-food-drink-288d8b">
                                                https://picryl.com/media/key-lime-pie-meringue-topped-tasty-food-drink-288d8b
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Bonda, Max. “Baked Cauliflower on Plate on
                                            Table.” Pexels,{" "}
                                            <a href="https://www.pexels.com/photo/baked-cauliflower-on-plate-on-table-16311286/">
                                                https://www.pexels.com/photo/baked-cauliflower-on-plate-on-table-16311286/
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            “Download Free Image of Chocolate Dessert on
                                            an Open Book with a Tea Pot and Tea Cup in the
                                            Background.” Rawpixel,{" "}
                                            <a href="https://www.rawpixel.com/image/3337193/free-photo-image-bread-and-coffee-coffee-book-images-photos-beverage">
                                                https://www.rawpixel.com/image/3337193/free-photo-image-bread-and-coffee-coffee-book-images-photos-beverage
                                            </a>
                                            . Accessed 13 Mar. 2025.
                                        </p>

                                        <p>
                                            “Golden Pasta Perfection.” Stockcake,{" "}
                                            <a href="https://stockcake.com/i/golden-pasta-perfection_1546435_1180626">
                                                https://stockcake.com/i/golden-pasta-perfection_1546435_1180626
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            “Healthy Salad Plate.” Stockcake,{" "}
                                            <a href="https://stockcake.com/i/healthy-salad-plate_609558_950481">
                                                https://stockcake.com/i/healthy-salad-plate_609558_950481
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            makafood. “Spinach Appetizer in Asian Style.”
                                            Pexels,{" "}
                                            <a href="https://www.pexels.com/photo/spinach-appetizer-in-asian-style-8954279/">
                                                https://www.pexels.com/photo/spinach-appetizer-in-asian-style-8954279/
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Sh, Nadin. “Baked Bell Pepper.” Pexels,{" "}
                                            <a href="https://www.pexels.com/photo/baked-bell-pepper-15747862/">
                                                https://www.pexels.com/photo/baked-bell-pepper-15747862/
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            ---. “Eggplant Served in a Restaurant.”
                                            Pexels,{" "}
                                            <a href="https://www.pexels.com/photo/eggplant-served-in-a-restaurant-19674153/">
                                                https://www.pexels.com/photo/eggplant-served-in-a-restaurant-19674153/
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Unsplash. Photo by Anne Nygård on Unsplash. 26
                                            Jan. 2020,{" "}
                                            <a href="https://unsplash.com/photos/white-clouds-in-blue-sky-vc-vPgGqAr4">
                                                https://unsplash.com/photos/white-clouds-in-blue-sky-vc-vPgGqAr4
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            ---. Photo by Arisa Chattasa on Unsplash. 9
                                            July 2019,{" "}
                                            <a href="https://unsplash.com/photos/white-printer-paper-close-up-photography-0LaBRkmH4fM">
                                                https://unsplash.com/photos/white-printer-paper-close-up-photography-0LaBRkmH4fM
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            ---. Photo by Chris Johnson on Unsplash. 27
                                            May 2019,{" "}
                                            <a href="https://unsplash.com/photos/city-buildings-during-daytime-0qNDaCqKXNo">
                                                https://unsplash.com/photos/city-buildings-during-daytime-0qNDaCqKXNo
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Bruschetta Image (Openverse): Citation:
                                            "Bruschetta." Openverse, Public Domain,
                                            ab93af55-bad9-4aee-bf75-50939117a01e?q=bruschetta&p=7.
                                        </p>

                                        <p>
                                            Jalapeno Poppers (Flickr): Citation: haydn.
                                            "Jalapeno Poppers - Rossi's Fish Bar -
                                            Swansea." Flickr, 26 Mar. 2019,{" "}
                                            <a href="https://www.flickr.com/photos/haydn/47474266341">
                                                https://www.flickr.com/photos/haydn/47474266341
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Coconut Ice Cream (Flickr): Citation: Michelle
                                            Peters - Jones. "Coconut Ice Cream." Flickr, 2
                                            Mar. 2012,{" "}
                                            <a href="https://www.flickr.com/photos/foodfootballandababy/6945130989">
                                                https://www.flickr.com/photos/foodfootballandababy/6945130989
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Image from Daniel Y Go (Flickr): Citation:
                                            danielygo. Untitled. Flickr, 23 Mar. 2013,{" "}
                                            <a href="https://www.flickr.com/photos/danielygo/8591457192">
                                                https://www.flickr.com/photos/danielygo/8591457192
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Banana Bread (Wikimedia Commons): Citation:
                                            "Two slices of banana bread on a blue plate,
                                            August 2008." Wikimedia Commons, 31 Aug. 2008,{" "}
                                            <a href="https://commons.wikimedia.org/wiki/File:Two_slices_of_banana_bread_on_a_blue_plate,_August_2008.jpg">
                                                https://commons.wikimedia.org/wiki/File:Two_slices_of_banana_bread_on_a_blue_plate,_August_2008.jpg
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Melanzane alla Parmigiana (Wikimedia Commons):
                                            Citation: "Melanzane alla Parmigiana."
                                            Wikimedia Commons, 21 July 2018,{" "}
                                            <a href="https://commons.wikimedia.org/wiki/File:Melanzane_alla_Parmigiana.jpg">
                                                https://commons.wikimedia.org/wiki/File:Melanzane_alla_Parmigiana.jpg
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Image from Michael Heilemann (Flickr):
                                            Citation: Michael Heilemann. Untitled. Flickr,
                                            11 Feb. 2020,{" "}
                                            <a href="https://www.flickr.com/photos/63324741@N04/49535206656">
                                                https://www.flickr.com/photos/63324741@N04/49535206656
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Image from Ella Olsson (Flickr): Citation:
                                            Ella Olsson. "Fika." Flickr, 27 Jan. 2019,{" "}
                                            <a href="https://www.flickr.com/photos/ellaolsson/45653618851">
                                                https://www.flickr.com/photos/ellaolsson/45653618851
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Onion Rings (Wikimedia Commons): Citation:
                                            "Onion Rings." Wikimedia Commons, 13 Aug.
                                            2012,{" "}
                                            <a href="https://commons.wikimedia.org/wiki/File:Onion_Rings_(6202926323).jpg">
                                                https://commons.wikimedia.org/wiki/File:Onion_Rings_(6202926323).jpg
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Image from Hockeycrew (Flickr): Citation:
                                            hockeycrew. Untitled. Flickr, 3 June 2011,{" "}
                                            <a href="https://www.flickr.com/photos/hockeycrew/5813562912">
                                                https://www.flickr.com/photos/hockeycrew/5813562912
                                            </a>
                                            .
                                        </p>

                                        <p>
                                            Jewish Food Arrangement (Freepik): Citation:
                                            Freepik. "Flat-Lay Delicious Jewish Food
                                            Arrangement." Freepik,{" "}
                                            <a href="https://www.freepik.com/free-photo/flat-lay-delicious-jewish-food-arrangement_12060497.htm">
                                                https://www.freepik.com/free-photo/flat-lay-delicious-jewish-food-arrangement_12060497.htm
                                            </a>
                                            .
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </MorphingDialogDescription>
                    </div>
                </MorphingDialogContent>
            </MorphingDialogContainer>
        </MorphingDialog>
    );
};

export default Tsa;

import React, { useState, useRef } from "react";
import CompButton from "../Ui/CompButton";
import SlideIndicator from "./slideIndicator";
import SuccessFeedback from "./SuccessFeedback";
import FailureFeedback from "./FailureFeedback";
import { SlideManager } from "@Praxeum-ai/LearnBlocks";

const DesktopComponent = () => {
    const [SuccessFeed, setSuccessFeed] = useState(false);
    const [FailureFeed, setFailureFeed] = useState(false);
    const [message, setMessage] = useState<string>("");

    const slideManagerRef = useRef<any>(null);

    const [canProceed, setCanProceed] = useState<boolean>(true);

    const handleContinue = () => {
        slideManagerRef?.current?.navigator(1);
        setCanProceed(false);
    };

    const triggerFeedback = (text: string, type: string) => {
        console.log(text);
        console.log(type);
        setMessage(text);
        if (type === "success") {
            setSuccessFeed(true);
        } else {
            setFailureFeed(true);
        }
    };

    const continueButtonStyles = {
        visible: "w-[120px]",
        hidden: "w-[120px] opacity-0 cursor-default",
    };

    const slides = [
        [
            {
                component: "Text",
                content: "<**Introduction**>",
            },
            {
                component: "Text",
                content:
                    "In the exciting world of <~grammar~>, we come across different types of nouns. Today, we will explore two important kinds of nouns: <(<**CONCRETE**>)> nouns and <(<**ABSTRACT**>)> nouns. ",
                tips: [
                    "Grammar is a set of rules that helps us understand and use words correctly when we speak and write.",
                ],
            },
            {
                component: "Text",
                content:
                    "We can communicate and express our thoughts more effectively if we know the differences between these two types. Let us explore the world of nouns now!",
            },
            {
                component: "Image",
                url: "https://res.cloudinary.com/dic7regoe/image/upload/v1691358759/praxeum/image_25_xshh7o.png",
            },
        ],
        [
            {
                component: "Text",
                content:
                    "Nouns are naming words. A noun is a word that names a person, animal, place, thing, event, feeling or idea. ",
            },
            {
                component: "Text",
                content: "There are two important types of nouns, namely ",
            },
            {
                component: "Text",
                content: "<?> noun and <?> noun",
            },
            {
                component: "ButtonGroup",
                answers: ["Concrete", "Abstract"],
                feedbacks: [
                    "Concrete nouns are things we can see, touch, hear, taste, or smell. Examples are tree, dog, chocolate, laptop computer, microphone, book, etc.",
                    "Abstract nouns are things we think about or feel but cannot touch physically. Examples are love, knowledge, hunger, joy, beauty, intelligence, etc.",
                ],
            },
        ],
        [
            {
                component: "Text",
                content:
                    "More exercises amigo! I’m sure you want to become very good at nouns, yeah? 😁😉 So let’s get your English straight as we fill in the blanks with the perfect noun! <(Tip: the answer is either a concrete or an abstract noun.)>",
            },
            {
                component: "Slider",
                slides: [
                    {
                        component: "Text",
                        content: "1. My <?> is a leading doctor in the town.",
                    },
                    {
                        component: "Text",
                        content: "2. Trees bring forth new <?> during spring.",
                    },
                    {
                        component: "Text",
                        content: "3. Big cats include <?> and tigers",
                    },
                    {
                        component: "Text",
                        content: "4. The king was known for his <?>",
                    },
                    {
                        component: "Text",
                        content: "5. <?> is loved by all people",
                    },
                    {
                        component: "Text",
                        content: "6. I've got <?> like a river.",
                    },
                ],
            },
            {
                component: "ButtonGroup",
                options: [
                    ["Music", "Father"],
                    ["Songs", "Leaves"],
                    ["Lions", "Rats"],
                    ["Authority", "Rats"],
                    ["Cleanliness", "Stealing"],
                    ["Chairs", "Joy"],
                ],
                answers: [
                    "Father",
                    "Leaves",
                    "Lions",
                    "Authority",
                    "Cleanliness",
                    "Joy",
                ],
                feedbacks: [
                    [
                        "Have another try.",
                        "That's correct! Father fits in best 👍",
                    ],
                    [
                        "Have another try.",
                        "That's right! You can find leaves on trees 👍",
                    ],
                    [
                        "You're a genius! Lions are certainly big cats. 👍",
                        "Are you sure about this? 🙄",
                    ],
                    ["👏", "🙄"],
                    ["👏", "🙄"],
                    ["👏", "🙄"],
                ],
            },
        ],
        [
            {
                component: "Text",
                content:
                    "Now that we have learnt what concrete and abstract nouns are, let's show off 😁 🤗 by identifying if the nouns shown in these images are either concrete or abstract nouns. 🚀",
            },
            {
                component: "FlashCards",
                cards: [
                    {
                        url: "https://i.ibb.co/5jKXLTk/Frame-1000004281-1.png",
                    },
                    {
                        url: "https://i.ibb.co/fNrj85L/Frame-1000004281.png",
                    },
                    {
                        url: "https://i.ibb.co/vqKpXWd/Frame-1000004281-2.png",
                    },
                    {
                        url: "https://i.ibb.co/5jKXLTk/Frame-1000004281-1.png",
                    },
                    {
                        url: "https://i.ibb.co/fNrj85L/Frame-1000004281.png",
                    },
                    {
                        url: "https://i.ibb.co/vqKpXWd/Frame-1000004281-2.png",
                    },
                ],
            },
            {
                component: "ButtonGroup",
                options: [["Concrete", "Abstract"]],
                answers: [
                    "Concrete",
                    "Concrete",
                    "Abstract",
                    "Abstract",
                    "Concrete",
                    "Abstract",
                ],
                feedbacks: ["👏", "🙄try again"],
            },
        ],
        [
            {
                component: "WordMatch",
                options: ["Concrete Nouns", "Abstract Nouns", "Nouns"],
                answers: [
                    "They are things we can see, touch, hear, taste, or smell.",
                    "They are things we think about or feel, but cannot touch physically",
                    "A word that names a person, animal, place, thing, feeling, idea, etc",
                ],
                feedbacks: ["That's correct", "Not correct, try again"],
            },
        ],
        [
            {
                component: "Text",
                content:
                    "Now that we have learnt what concrete and abstract nouns are, let's show off 😁 🤗 by identifying if the nouns shown in these images are either concrete or abstract nouns. 🚀",
            },
            {
                component: "FlashCards",
                cards: [
                    {
                        content: "Hello",
                    },
                    {
                        content: "World",
                    },
                    {
                        content: "Lets",
                    },
                    {
                        content: "Get",
                    },
                    {
                        content: "Engaged",
                    },
                    {
                        content: "Here",
                    },
                ],
            },
            {
                component: "ButtonGroup",
                options: [["Concrete", "Abstract"]],
                answers: [
                    "Concrete",
                    "Concrete",
                    "Abstract",
                    "Abstract",
                    "Concrete",
                    "Abstract",
                ],
            },
        ],
    ];

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="w-[120px]" onClick={() => setFailureFeed(true)}>
                    <CompButton title="Previous" prev />
                </div>
                <div className="lg:w-9/12 xl:w-8/12 2xl:w-7/12 ">
                    <SlideIndicator num={5} active={1} />
                    <div className="mt-4 w-full bg-bgcomp bg-cover rounded-lg">
                        <SlideManager
                            lessonSlides={slides}
                            ref={slideManagerRef}
                            canProceed={(val: boolean) => setCanProceed(val)}
                            handleFeedback={(text: string, type: string) =>
                                triggerFeedback(text, type)
                            }
                        />
                    </div>
                </div>
                <div
                    className={
                        canProceed
                            ? continueButtonStyles.visible
                            : continueButtonStyles.hidden
                    }
                    onClick={() => handleContinue()}
                >
                    <CompButton title="Continue" />
                </div>
            </div>
            <div>
                {SuccessFeed && (
                    <SuccessFeedback
                        close={() => setSuccessFeed(false)}
                        message={message}
                    />
                )}
                {FailureFeed && (
                    <FailureFeedback
                        close={() => setFailureFeed(false)}
                        message={message}
                    />
                )}
            </div>
        </>
    );
};

export default DesktopComponent;

import React, { useState, useRef, FC } from "react";
import { ContinueBtn, PreviousBtn } from "../Ui/CompButton";
import SlideIndicator from "./slideIndicator";
import SuccessFeedback from "./SuccessFeedback";
import FailureFeedback from "./FailureFeedback";
import { SlideManager } from "@Praxeum-ai/LearnBlocks";

interface ComponentSlides {
    slides: any[];
    back : Function;
}

const DesktopComponent: FC<ComponentSlides> = ({ slides , back}) => {
    const [SuccessFeed, setSuccessFeed] = useState(false);
    const [FailureFeed, setFailureFeed] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [activeSlide, setActiveSlide] = useState<number>(0);

    const slideManagerRef = useRef<any>(null);
    const [canProceed, setCanProceed] = useState<boolean>(true);

    const handleContinue = () => {
        const currentSlideIndex = slideManagerRef?.current?.activeSlideIndex();
        if( currentSlideIndex === (slides.length - 1) ) {
            back();
        }else{
            slideManagerRef?.current?.navigator(1);
            setCanProceed(false);
            setSuccessFeed(false);
            setFailureFeed(false);
        }

    };

    const handlePrevious = () => {
        slideManagerRef?.current?.navigator(-1);
        setCanProceed(false);
        setSuccessFeed(false);
        setFailureFeed(false);
    };

    const changeSlide = (index: number) => {
        slideManagerRef?.current?.navigator(1, index);
        setSuccessFeed(false);
        setFailureFeed(false);
    };

    const triggerFeedback = (text: string, type: string) => {
        setMessage(text);
        if (type === "success") {
            setSuccessFeed(true);
            setFailureFeed(false);
        } else {
            setFailureFeed(true);
            setSuccessFeed(false);
        }
    };

    const continueButtonStyles = {
        visible: "w-[120px]",
        hidden: "w-[120px] opacity-0 cursor-default",
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="w-[120px]" onClick={() => handlePrevious()}>
                    {activeSlide > 0 && ( <PreviousBtn title="Previous" prev />)}
                </div>
                
                <div className="lg:w-[calc(100%_-_300px)]">
                    <SlideIndicator
                        num={slides.length}
                        active={activeSlide}
                        changeSlide={changeSlide}
                    />
                    <div className="mt-4 w-full bg-bgcomp bg-cover rounded-lg min-h-[70vh] place-center fw-600">
                        <SlideManager
                            lessonSlides={slides}
                            ref={slideManagerRef}
                            canProceed={(val: boolean) => setCanProceed(val)}
                            handleFeedback={(text: string, type: string) =>
                                triggerFeedback(text, type)
                            }
                            updateActiveSlide={(i:number) => setActiveSlide(i)}
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
                    <ContinueBtn title="Continue" />
                </div>
            </div>
            <div>
                {SuccessFeed && (
                    <SuccessFeedback
                        close={() => setSuccessFeed(false)}
                        message={message}
                        canProceed={canProceed}
                        proceed={() => handleContinue()}
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

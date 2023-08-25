import React, { useState, useRef, FC } from "react";
import CompButton from "../Ui/CompButton";
import SlideIndicator from "./slideIndicator";
import SuccessFeedback from "./SuccessFeedback";
import FailureFeedback from "./FailureFeedback";
import { SlideManager } from "@Praxeum-ai/LearnBlocks";


interface ComponentSlides {
    slides : any[]
}

const DesktopComponent : FC<ComponentSlides> = ({slides}) => {
    const [SuccessFeed, setSuccessFeed] = useState(false);
    const [FailureFeed, setFailureFeed] = useState(false);
    const [message, setMessage] = useState<string>("");

    const slideManagerRef = useRef<any>(null);

    const [canProceed, setCanProceed] = useState<boolean>(true);

    const handleContinue = () => {
        slideManagerRef?.current?.navigator(1);
        setCanProceed(false);
    };

    const handlePrevious = () => {
        slideManagerRef?.current?.navigator(-1);
        setCanProceed(false);
    }

    const triggerFeedback = (text: string, type: string) => {
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

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="w-[120px]" onClick={() => handlePrevious()}>
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

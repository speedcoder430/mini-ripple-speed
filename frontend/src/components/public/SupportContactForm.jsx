import React from "react";
import ContactHeader from "./ContactHeader";
import FormInput from "./FormInput";
import IssueTypeDropdown from "./IssueTypeDropdown";
import Button from "./Button";

function SupportContactForm() {
    return (
        <section className="box-border relative hidden lg:flex flex-col items-start px-9 py-20 w-full h-[828px] max-w-[1241px] max-md:px-6 max-md:py-16 max-sm:px-4 max-sm:py-10 rounded-[14px] z-[10]">
            <div className="absolute left-1/2 top-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 z-[0] rounded-[14px]">
                <img src="/landing/support-contact-form.png" alt="SupportContactForm" className="rounded-[14px]" />
            </div>

            <div className="absolute left-1/2 top-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 z-[0] rounded-[14px] bg-[#01173280]"></div>

            <ContactHeader />

            <form className="w-full max-w-[598px] z-[10] font-['Jost']">
                <FormInput icon={<UserIcon />} placeholder="Name" />
                <FormInput icon={<MailIcon />} placeholder="email@gmail.com" />
                <IssueTypeDropdown />
                <textarea type="text" placeholder="Message" rows="4" cols="50" className="px-3 py-5 mb-6 w-full text-base text-start rounded border-solid border-[1.5px] bg-[#0000] border-neutral-300 max-w-[598px] h-[127px] text-neutral-300 max-md:text-base max-sm:text-sm" />
                <p className="mb-6 text-xs font-bold text-neutral-300 max-md:text-xs max-sm:text-xs">
                    By clicking Submit Request, you agree to our Terms and Conditions.
                </p>
                <Button variant="primary">Submit Request</Button>
            </form>
            <div className="absolute w-[684px] h-[684px] shrink-0 rounded-full bg-[#ffc10780] blur-[250px] right-[-800px] top-[-150px] z-[-1]"></div>
        </section>
    );
}

function UserIcon() {
    return (
        <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="user-icon"
            style={{ width: "20px", height: "20px", marginRight: "8px" }}
        >
            <path
                d="M15.5388 16.2273C14.3547 17.6106 12.5263 18.3343 10.0004 18.3343C7.47395 18.3343 5.64689 17.6104 4.46547 16.2268L4.46546 16.2268C4.05963 15.7516 3.83667 15.1471 3.83667 14.5222V14.0408C3.83667 13.2819 4.45185 12.6668 5.21073 12.6668H14.7955C15.5544 12.6668 16.1696 13.2819 16.1696 14.0408V14.5203C16.1696 15.1463 15.9459 15.7517 15.5388 16.2273ZM15.5388 16.2273L15.9187 16.5524L15.5388 16.2273ZM14.7955 12.9168H5.21073C4.58991 12.9168 4.08667 13.42 4.08667 14.0408V14.5222C4.08667 15.0876 4.28838 15.6345 4.65557 16.0644C5.82763 17.437 7.63129 18.0843 10.0004 18.0843C12.3696 18.0843 14.1743 17.437 15.3488 16.0647C15.7172 15.6344 15.9196 15.0866 15.9196 14.5203V14.0408C15.9196 13.42 15.4163 12.9168 14.7955 12.9168ZM10.0004 2.67065C12.0254 2.67065 13.6671 4.31228 13.6671 6.33732C13.6671 8.36237 12.0254 10.004 10.0004 10.004C7.97534 10.004 6.33371 8.36237 6.33371 6.33732C6.33371 4.31228 7.97533 2.67065 10.0004 2.67065ZM10.0004 2.92065C8.11344 2.92065 6.58371 4.45035 6.58371 6.33732C6.58371 8.2243 8.11344 9.754 10.0004 9.754C11.8874 9.754 13.4171 8.22429 13.4171 6.33732C13.4171 4.45035 11.8874 2.92065 10.0004 2.92065Z"
                fill="#8192AB"
                stroke="#8192AB"
            />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mail-icon"
            style={{ width: "20px", height: "20px", marginRight: "8px" }}
        >
            <path
                d="M17.5834 7.48249V8.31075V14.4583V14.4684L17.583 14.4784L17.5782 14.598L17.5778 14.6082L17.5769 14.6183C17.4952 15.6253 16.6528 16.4166 15.6251 16.4166H4.37508H4.36498L4.35489 16.4162L4.23529 16.4113L4.22514 16.4109L4.21502 16.4101C3.20808 16.3284 2.41675 15.486 2.41675 14.4583V8.31158V7.48342L3.14962 7.86912L9.92641 11.4357L9.96824 11.4542C9.9981 11.462 10.0303 11.4586 10.0583 11.4439L17.5834 7.48249ZM17.5834 7.48249L16.8505 7.86831L10.0584 11.4438L17.5834 7.48249ZM15.6453 4.58366L15.6352 4.58325H15.6251H4.37508C3.34736 4.58325 2.50496 5.37458 2.42322 6.38152L2.4224 6.39164L2.42199 6.40179L2.41716 6.5214L2.41675 6.53149V6.54159V6.89909V7.20096L2.68388 7.34155L9.76722 11.0695L10.0001 11.192L10.233 11.0694L17.3163 7.34069L17.5834 7.20009V6.89825V6.54159C17.5834 5.51386 16.7921 4.67147 15.7851 4.58972L15.775 4.5889L15.7649 4.58849L15.6453 4.58366ZM4.24268 4.33714L4.38205 4.33325H15.6251C16.8002 4.33325 17.7612 5.25138 17.8296 6.40914L17.8334 6.54852V14.4583C17.8334 15.6333 16.9153 16.5944 15.7575 16.6627L15.6182 16.6666H4.37508C3.19993 16.6666 2.23886 15.7484 2.17063 14.5906L2.16675 14.4513V6.54159C2.16675 5.36643 3.08492 4.40537 4.24268 4.33714Z"
                fill="#4D5158"
                stroke="#8192AB"
            />
        </svg>
    );
}

export default SupportContactForm;

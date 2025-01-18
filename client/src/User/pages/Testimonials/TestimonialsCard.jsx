import { FormatQuote } from "@mui/icons-material";

const TestimonialsCard = ({ content, name, designation, image }) => {
    return (
        <div className="flex flex-col justify-between bg-darkGray p-4 pb-8 rounded-[20px] h-auto w-[90%] max-w-[700px] mx-auto my-5 shadow-custom">

            <FormatQuote style={{ fontSize: '5rem' }} className="object-contain text-white" />

            <p className="font-poppins font-normal text-[18px] text-white my-4 leading-[23px]">
                {content}
            </p>

            <div className="flex flex-col items-center mt-4">
                <img src={image} alt={name} className="w-[80px] h-[80px] rounded-full" />
                <div className="flex flex-col items-center mt-2">
                    <h4 className="font-poppins font-semibold text-[20px] text-white leading-[32px]">{name}</h4>
                    <p className="font-poppins font-[100] text-[12px] text-textGray leading-[24px]">{designation}</p>
                </div>
            </div>
        </div>
    );
}

export default TestimonialsCard;

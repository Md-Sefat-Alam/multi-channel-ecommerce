import { MotionContainer } from "../common/MotionContainer";
import Title from "../common/Title";
import OffersCard from "./OffersCard";

type Props = {};

export default function Offers({ }: Props) {
  return (
    <div className="py-10 overflow-hidden">
      <MotionContainer>
        <Title title="Best Offers Today" addAfter />
      </MotionContainer>
      <div className="container mx-auto ">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 py-10 px-2 lg:px-0">
          <MotionContainer direction="right">
            <OffersCard
              offerTitle="Best Offer Today"
              title="lorem afa afs"
              url="/assets/products/WhatsApp Image 2024-09-06 at 10.24.24 PM.jpeg"
            />
          </MotionContainer>

          <MotionContainer direction="left">
            <OffersCard
              offerTitle="Our last stock offer"
              title="lorem aaa asdfas"
              url="/assets/products/WhatsApp Image 2024-09-06 at 10.24.39 PM.jpeg"
            />
          </MotionContainer>
        </div>
      </div>
    </div>
  );
}

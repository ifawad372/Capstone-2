import MediaCard from "./Card.jsx/MediaCard";
import apples from '../../assets/Apples.webp';
import babySpinach from '../../assets/BabySpinach.webp';
import blueberries from '../../assets/blueberries.webp';
import brusselsSprouts from '../../assets/BrusselsSprouts.webp';
import celerySticks from '../../assets/CelerySticks.webp';
import corn from '../../assets/Corn.webp';
import cucumber from '../../assets/Cucumber.webp';
import dates from '../../assets/Dates.webp';
import clementies from '../../assets/clementines.webp';


export default function Cards() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                <MediaCard productName="Apples" price="6.00" weight="1lb" imageURL={apples} />
                <MediaCard productName="Baby Spinach" price="3.29" weight="1lb" imageURL={babySpinach} />
                <MediaCard productName="Blue berries" price="7.99" weight="1lb" imageURL={blueberries} />
                <MediaCard productName="Brussels sprouts" price="6.00" weight="1lb" imageURL={brusselsSprouts} />
                <MediaCard productName="Celery Sticks" price="3.29" weight="1lb" imageURL={celerySticks} />
                <MediaCard productName="Corn" price="7.99" weight="1lb" imageURL={corn} />
                <MediaCard productName="Cucumber" price="6.00" weight="1lb" imageURL={cucumber} />
                <MediaCard productName="Dates" price="3.29" weight="1lb" imageURL={dates} />
                <MediaCard productName="Clementies" price="7.99" weight="1lb" imageURL={clementies} />
            </div>
        </div>
    );
}

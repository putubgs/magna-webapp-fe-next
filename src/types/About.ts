interface Taglines {
	title: string;
	description: string;
}

interface UpComingEventsData {
	title: string;
	description: string;
	date: string;
	time: string;
	image: string;
}

interface Partners {
	src: string;
	alt: string;
}

interface ClientReview {
	name: string;
	position: string;
	description: string;
}

interface Achievements {
	end: number;
	label: string;
	suffix: string;
}

interface PreviousEventGallery {
	imageUrl: string;
	date: string;
	title: string;
}

interface Contact {
	title: string;
	icon: string;
	link: string;
}

interface ContactsGroup {
	top: Contact[];
	middle: Contact[];
	bottom: Contact[];
}

interface AboutType {
	logo: string;
	title: string;
	description: string;
	detailBuLink: string;
	igLink: string;
	mailLink: string;
	bgColor: string;
	tagline: string;
	taglines: Taglines[];
	upComingEventsData?: UpComingEventsData[];
	partners: Partners[];
	clientsReviews: ClientReview[];
	achievements: Achievements[];
	previousEventGallery: PreviousEventGallery[];
	contacts: ContactsGroup;
}

export default AboutType;

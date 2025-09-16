export interface SuperAdmin {
	superAdminId: string;
	email: string;
	password: string;
	forgotPasswordToken: string;
	forgotPasswordExpired: Date;
}

export interface Admin {
	adminId: string;
	superAdminId: string;
	email: string;
	password: string;
	forgotPasswordToken: string;
	forgotPasswordExpired: Date;
}

export interface Organization {
	organizationId: string;
	superAdminId: string;
	adminId: string;
	organizationName: string;
	logo: string;
	shortDesc: string;
	fullDesc: string;
	linkedinLink: string;
	tiktokLink: string;
	instagramLink: string;
	email: string;
	whatsapp: string;
	cardStatus: boolean;
	pageStatus: boolean;
	foundedDate: Date;
}

export interface Partner {
	partnerId: string;
	partnerName: string;
	partnerLogo: string;
}

export interface OrganizationPartner {
	organizationId: string;
	partnerId: string;
}

export interface OrgDetailChanges {
	orgDetailChangesId: string;
	adminId: string;
	organization: string;
	logo: string;
	shortDesc: string;
	fullDesc: string;
	linkedinLink: string;
	tiktokLink: string;
	instagramLink: string;
	email: string;
	whatsapp: string;
	cardStatus: boolean;
	pageStatus: boolean;
	foundedDate: Date;
}

export interface EventDocumentation {
	eventDocId: string;
	organizationId: string;
	eventDocImg: string;
	eventTitle: string;
	eventDocDetails: string;
	eventDate: Date;
}

export interface Testimony {
	testimonyId: string;
	participantName: string;
	organizationId: string;
	position: string;
	message: string;
	testimonyDate: Date;
}

export interface Event {
	eventId: string;
	organizationId: string;
	mainImage: string;
	title: string;
	description: string;
	gformLink: string;
	registrationDeadline: Date;
	eventStartDate: Date;
	eventEndDate: Date;
}

export interface OrgImpact {
	impactId: string;
	organization: string;
}

export interface MetricDetail {
	metricId: string;
	impactId: string;
	metricName: string;
	metricValue: number;
	displayStatus: boolean;
}

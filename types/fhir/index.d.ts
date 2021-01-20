// Type definitions for FHIR Release 3.0

declare module fhir {
    /**
     * Any combination of letters, numerals, "-" and ".", with a length limit of 64 characters.  (This might be an integer, an unprefixed OID, UUID or any other identifier pattern that meets these constraints.)  Ids are case-insensitive.
     */
    type id = string;
    /**
     * A date or partial date (e.g. just year or year + month). There is no time zone. The format is a union of the schema types gYear, gYearMonth and date.  Dates SHALL be valid dates.
     */
    type date = string;
    /**
     * A date, date-time or partial date (e.g. just year or year + month).  If hours and minutes are specified, a time zone SHALL be populated. The format is a union of the schema types gYear, gYearMonth, date and dateTime. Seconds must be provided due to schema type constraints but may be zero-filled and may be ignored.                 Dates SHALL be valid dates.
     */
    type dateTime = string;
    /**
     * A rational number with implicit precision
     */
    type decimal = number;
    /**
     * The use of an address
     */
    type AddressUse = 'home' | 'work' | 'temp' | 'old';
    /**
     * The type of an address (physical / postal)
     */
    type AddressType = 'postal' | 'physical' | 'both';
    /**
     * The gender of a person used for administrative purposes
     */
    type AdministrativeGender = 'male' | 'female' | 'other' | 'unknown';
    /**
     * The free/busy status of an appointment
     */
    type AppointmentStatus =
        | 'proposed'
        | 'pending'
        | 'booked'
        | 'arrived'
        | 'fulfilled'
        | 'cancelled'
        | 'noshow'
        | 'entered-in-error';
    /**
     * Current state of the delivery
     */
    type DeliveryStatus = 'planned' | 'in-progress' | 'arrived' | 'finished';
    /**
     * Current state of the encounter
     */
    type EncounterStatus =
        | 'planned'
        | 'arrived'
        | 'triaged'
        | 'in-progress'
        | 'onleave'
        | 'finished'
        | 'cancelled'
        | 'entered-in-error'
        | 'unknown';
    /**
     * The availability status of the device
     */
    type FHIRDeviceStatus = 'active' | 'inactive' | 'entered-in-error' | 'unknown';
    /**
     * Indicates whether the location is still in use
     */
    type LocationStatus = 'active' | 'suspended' | 'inactive';
    /**
     * NEW
     * Possible service areas for med techs
     */
    type ServiceArea = 'north-bay' | 'south-bay' | 'los-angeles';
    /**
     * Codes identifying the stage lifecycle stage of a request
     */
    type RequestStatus = 'draft' | 'active' | 'suspended' | 'cancelled' | 'completed' | 'entered-in-error' | 'unknown';
    /**
     * Time range defined by start and end date/time
     */
    interface Period {
        /**
         * Starting time with inclusive boundary
         */
        startTime: dateTime;
        /**
         * End time with inclusive boundary, if not ongoing
         */
        endTime: dateTime;
    }
    /**
     * An location expressed using postal conventions (as opposed to GPS or other location definition formats)
     */
    interface Address {
        /**
         * home | work | temp | old - purpose of this address
         */
        use: AddressUse;
        /**
         * postal | physical | both
         */
        type?: AddressType;
        /**
         * Text representation of the address
         */
        text?: string;
        /**
         * Street name, number, direction & P.O. Box etc.
         */
        line: string;
        /**
         * Name of city, town etc.
         */
        city: string;
        /**
         * District name (aka county)
         */
        district?: string;
        /**
         * Sub-unit of country (abbreviations ok)
         */
        state: string;
        /**
         * Postal code for area
         */
        postalCode: string;
        /**
         * Country (e.g. can be ISO 3166 2 or 3 letter code)
         */
        country: string;
    }
    /**
     * A measured or measurable amount
     */
    interface Quantity {
        /**
         * Numerical value (with implicit precision)
         */
        value?: decimal;
        /**
         * Unit representation
         */
        unit?: string;
        // /**
        //  * < | <= | >= | > - how to understand the value
        //  */
        // comparator?: QuantityComparator;
        // /**
        //  * System that defines coded unit form
        //  */
        // system?: uri;
        // /**
        //  * Coded form of the unit
        //  */
        // code?: code;
    }
    /**
     * A duration of time during which an organism (or a process) has existed
     */
    interface Age extends Quantity {}
    /**
     * A measured or measurable amount
     */
    interface Count extends Quantity {}
    /**
     * A length - a value with a unit that is a physical distance
     */
    interface Distance extends Quantity {}
    /**
     * A length of time
     */
    interface Duration extends Quantity {}
    /**
     * Provides guide for interpretation
     */
    interface ObservationReferenceRange {
        /**
         * Low Range, if relevant
         */
        low?: Quantity;
        /**
         * High Range, if relevant
         */
        high?: Quantity;
        /**
         * Text based reference range in an observation
         */
        text?: string;
        // /**
        //  * Reference range qualifier
        //  */
        // type?: CodeableConcept;
        // /**
        //  * Reference range population
        //  */
        // appliesTo?: CodeableConcept[];
        // /**
        //  * Applicable age range, if relevant
        //  */
        // age?: Range;
    }
    /**
     * Component results
     */
    interface ObservationComponent {
        /**
         * Actual component result
         */
        valueQuantity?: Quantity;
        /**
         * Actual component result
         */
        valueString?: string;
        /**
         * Actual component result
         */
        valueDateTime?: dateTime;
        /**
         * Actual component result
         */
        valuePeriod?: Period;
        /**
         * EDITED
         * Why the component result is missing
         */
        dataAbsentReason?: string;
        /**
         * EDITED
         * High, low, normal, etc.
         */
        interpretation?: string;
        /**
         * Provides guide for interpretation of component result
         */
        referenceRange?: ObservationReferenceRange[];
        /**
         * NEW
         * What is being measured
         */
        measured: string;
        // /**
        //  * Type of component observation (code / type)
        //  */
        // code: CodeableConcept;
        // /**
        //  * Actual component result
        //  */
        // valueCodeableConcept?: CodeableConcept;
        // /**
        //  * Actual component result
        //  */
        // valueRange?: Range;
        // /**
        //  * Actual component result
        //  */
        // valueRatio?: Ratio;
        // /**
        //  * Actual component result
        //  */
        // valueSampledData?: SampledData;
        // /**
        //  * Actual component result
        //  */
        // valueAttachment?: Attachment;
        // /**
        //  * Actual component result
        //  */
        // valueTime?: time;
        // /**
        //  * Why the component result is missing
        //  */
        // dataAbsentReason?: CodeableConcept;
        // /**
        //  * High, low, normal, etc.
        //  */
        // interpretation?: CodeableConcept;
    }
    /**
     * The absolute geographic location
     */
    interface LocationPosition {
        /**
         * Longitude with WGS84 datum
         */
        longitude: decimal;
        /**
         * Latitude with WGS84 datum
         */
        latitude: decimal;
        /**
         * Altitude with WGS84 datum
         */
        altitude?: decimal;
    }
    /**
     * Details and position information for a physical place
     */
    interface Location {
        /**
         * Unique code or number identifying the location to its users
         */
        identifier?: id;
        /**
         * active | suspended | inactive
         */
        status?: LocationStatus;
        /**
         * Name of the location as used by humans
         */
        name?: string;
        /**
         * A list of alternate names that the location is known as, or was known as in the past
         */
        alias?: string[];
        /**
         * Additional details about the location that could be displayed as further information to identify the location beyond its name
         */
        description?: string;
        /**
         * Physical location
         */
        address: Address;
        /**
         * The absolute geographic location
         */
        position: LocationPosition;
        /**
         * Organization responsible for provisioning and upkeep
         */
        managingOrganization?: Organization;
        /**
         * Another Location this one is physically part of
         */
        partOf?: Location;
        /**
         * NEW
         * Phone number
         */
        phone: string;
        /**
         * NEW
         * Email
         */
        email: string;
        // /**
        //  * The Operational status of the location (typically only for a bed/room)
        //  */
        // operationalStatus?: Coding;
        // /**
        //  * instance | kind
        //  */
        // mode?: LocationMode;
        // /**
        //  * Type of function performed
        //  */
        // type?: CodeableConcept;
        // /**
        //  * Contact details of the location
        //  */
        // telecom?: ContactPoint[];
        // /**
        //  * Physical form of the location
        //  */
        // physicalType?: CodeableConcept;
        // /**
        //  * Technical endpoints providing access to services operated for the location
        //  */
        // endpoint?: Reference[];
    }
    /**
     * Item used in healthcare
     */
    interface Device {
        /**
         * Instance identifier
         */
        identifier?: id;
        /**
         * Unique Device Identifier (UDI) Barcode string
         */
        udi?: id;
        /**
         * EDITED
         * active | inactive | entered-in-error | unknown
         */
        status?: FHIRDeviceStatus;
        /**
         * EDITED
         * What kind of device this is
         */
        type?: string;
        /**
         * Lot number of manufacture
         */
        lotNumber?: string;
        /**
         * Name of device manufacturer
         */
        manufacturer?: string;
        /**
         * Date when the device was made
         */
        manufactureDate?: dateTime;
        /**
         * Date and time of expiry of this device (if applicable)
         */
        expirationDate?: dateTime;
        /**
         * Model id assigned by the manufacturer
         */
        model?: string;
        /**
         * Version number (i.e. software)
         */
        version?: string;
        /**
         * Patient to whom Device is affixed
         */
        patient?: Patient;
        /**
         * Organization responsible for device
         */
        owner?: Organization;
        /**
         * Where the resource is found
         */
        location?: Location;
        /**
          * Device notes and comments
          */
        note?: string[];
        // /**
        //  * Unique Device Identifier (UDI) Barcode string
        //  */
        // udi?: DeviceUdi;
        // /**
        //  * What kind of device this is
        //  */
        // type?: CodeableConcept;
        // /**
        //  * Details for human/organization for support
        //  */
        // contact?: ContactPoint[];
        // /**
        //  * Network address to contact device
        //  */
        // url?: uri;
        // /**
        //  * Safety Characteristics of Device
        //  */
        // safety?: CodeableConcept[];
    }
    /**
     * NEW
     * Information about an laboratory providing lab services
     */
    interface Laboratory {
        /**
         * An identifier for this laboratory
         */
        identifier?: id;
        /**
         * Whether this laboratory's record is in active use
         */
        active?: boolean;
        /**
         * A name associated with the laboratory
         */
        name: string;
        /**
         * A phone number for the laboratory
         */
        phone: string;
        /**
         * A email for the laboratory
         */
        email: string;
        /**
         * Location related to the laboratory
         */
        location: Location;
        /**
         * Services offered at this laboratory
         */
        servicesOffered: HealthcareService[];
    }
    /**
     * NEW
     * Information about an medical technician providing health care services
     */
    interface MedTech {
        /**
         * An identifier for this med tech
         */
        identifier?: id;
        /**
         * Whether this med tech's record is in active use
         */
        active?: boolean;
        /**
         * A name associated with the med tech
         */
        name: string;
        /**
         * A phone number for the med tech
         */
        phone: string;
        /**
         * A email for the med tech
         */
        email: string;
        /**
         * Current location of the med tech
         */
        location: Location;
        /**
         * Working location of the med tech (hospital, office building, etc.)
         */
        workLocation: Location;
        /**
         * Organization related to the med tech
         */
        organization?: Organization;
        /**
         * Availabilities related to the med tech
         */
        availabilites: Period[];
        /**
         * Schedule related to the med tech
         */
        schedule: Period;
        /**
         * Areas the med tech will service
         */
        serviceAreas: ServiceArea[];
        /**
         * Services the med tech can perform
         */
        services: HealthcareService[];
        /**
         * Appointments the med tech has upcoming
         */
        appointments?: Appointment[];
    }
    /**
     * Measurements and simple assertions
     */
    interface Observation {
        /**
         * Who and/or what this is about
         */
        subject: Patient;
        /**
         * Healthcare event during which this observation is made
         */
        context: Encounter;
        /**
         * Clinically relevant time/time-period for observation
         */
        effectiveDateTime?: dateTime;
        /**
         * Clinically relevant time/time-period for observation
         */
        effectivePeriod?: Period;
        /**
         * Date/Time this was made available
         */
        issued?: dateTime;
        /**
         * Who is responsible for the observation
         */
        performer?: MedTech;
        /**
         * Actual result
         */
        valueQuantity?: Quantity;
        /**
         * Actual result
         */
        valueString?: string;
        /**
         * Actual result
         */
        valueBoolean?: boolean;
        /**
         * Actual result
         */
        valueDateTime?: dateTime;
        /**
         * Actual result
         */
        valuePeriod?: Period;
        /**
         * Comments about result
         */
        comment?: string;
        /**
         * EDITED
         * How it was done
         */
        method?: string;
        /**
         * (Measurement) Device
         */
        device?: Device;
        /**
         * EDITED
         * Why the component result is missing
         */
        dataAbsentReason?: string;
        /**
         * EDITED
         * High, low, normal, etc.
         */
        interpretation?: string;
        /**
         * Provides guide for interpretation
         */
        referenceRange?: ObservationReferenceRange[];
        /**
         * Component results
         */
        component?: ObservationComponent[];
        /**
         * NEW
         * What is being measured
         */
        measured: string;
    //     /**
    //      * Business Identifier for observation
    //      */
    //     identifier?: Identifier[];
    //     /**
    //      * Fulfills plan, proposal or order
    //      */
    //     basedOn?: Reference[];
    //     /**
    //      * registered | preliminary | final | amended +
    //      */
    //     status: ObservationStatus;
    //     /**
    //      * Classification of  type of observation
    //      */
    //     category?: CodeableConcept[];
    //     /**
    //      * Type of observation (code / type)
    //      */
    //     code: CodeableConcept;
    //     /**
    //      * Actual result
    //      */
    //     valueCodeableConcept?: CodeableConcept;
    //     /**
    //      * Actual result
    //      */
    //     valueRange?: Range;
    //     /**
    //      * Actual result
    //      */
    //     valueRatio?: Ratio;
    //     /**
    //      * Actual result
    //      */
    //     valueSampledData?: SampledData;
    //     /**
    //      * Actual result
    //      */
    //     valueAttachment?: Attachment;
    //     /**
    //      * Actual result
    //      */
    //     valueTime?: time;
    //     /**
    //      * Why the result is missing
    //      */
    //     dataAbsentReason?: CodeableConcept;
    //     /**
    //      * High, low, normal, etc.
    //      */
    //     interpretation?: CodeableConcept;
    //     /**
    //      * Observed body part
    //      */
    //     bodySite?: CodeableConcept;
    //     /**
    //      * How it was done
    //      */
    //     method?: CodeableConcept;
    //     /**
    //      * Specimen used for this observation
    //      */
    //     specimen?: Reference;/**
    //     * Resource related to this observation
    //     */
    //    related?: ObservationRelated[];
    }
    /**
     * A grouping of people or organizations with a common purpose
     */
    interface Organization {
        /**
         * An identifier for this organization
         */
        identifier?: id;
        /**
         * Whether the organization's record is still in active use
         */
        active?: boolean;
        /**
         * Name used for the organization
         */
        name: string;
        /**
         * A list of alternate names that the organization is known as, or was known as in the past
         */
        alias?: string[];
        /**
         * A phone number for the organization
         */
        phone: string;
        /**
         * A email for the organization
         */
        email: string;
        /**
         * NEW
         * An location for the organization
         */
        location: Location;
        /**
         * The organization of which this organization forms a part
         */
        partOf?: Organization;
        // /**
        //  * Kind of organization
        //  */
        // type?: CodeableConcept[];
        // /**
        //  * A contact detail for the organization
        //  */
        // telecom?: ContactPoint[];
        // /**
        //  * An address for the organization
        //  */
        // address?: Address[];
        // /**
        //  * Contact for the organization for a certain purpose
        //  */
        // contact?: OrganizationContact[];
        // /**
        //  * Technical endpoints providing access to services operated for the organization
        //  */
        // endpoint?: Reference[];
    }
    /**
     * Information about an individual receiving health care services
     */
    interface Patient {
        /**
         * An identifier for this patient
         */
        identifier?: id;
        /**
         * Whether this patient's record is in active use
         */
        active?: boolean;
        /**
         * EDITED
         * A name associated with the patient
         */
        name: string;
        /**
         * NEW
         * A phone number for the patient
         */
        phone: string;
        /**
         * NEW
         * A email for the patient
         */
        email: string;
        /**
         * NEW
         * Location of the patient that is not role specific (typically home location)
         */
        location: Location;
        /**
         * male | female | other | unknown
         */
        gender: AdministrativeGender;
        /**
         * The date on which the patient was born
         */
        birthDate: date;
        /**
         * Patient's nominated primary care provider
         */
        generalPractitioner?: Practitioner;
        /**
         * Organization that is the custodian of the patient record
         */
        managingOrganization?: Organization;
        /**
         * Service area the patient resides in
         */
        serviceArea?: ServiceArea;
        // /**
        //  * A name associated with the patient
        //  */
        // name?: HumanName[];
        // /**
        //  * A contact detail for the individual
        //  */
        // telecom?: ContactPoint[];
        //  /**
        //  * Indicates if the individual is deceased or not
        //  */
        // deceasedBoolean?: boolean;
        // /**
        //  * Indicates if the individual is deceased or not
        //  */
        // deceasedDateTime?: dateTime;
        // /**
        //  * Addresses for the individual
        //  */
        // address?: Address[];
        // /**
        //  * Marital (civil) status of a patient
        //  */
        // maritalStatus?: CodeableConcept;
        // /**
        //  * Whether patient is part of a multiple birth
        //  */
        // multipleBirthBoolean?: boolean;
        // /**
        //  * Whether patient is part of a multiple birth
        //  */
        // multipleBirthInteger?: integer;
        // /**
        //  * Image of the patient
        //  */
        // photo?: Attachment[];
        // /**
        //  * A contact party (e.g. guardian, partner, friend) for the patient
        //  */
        // contact?: PatientContact[];
        // /**
        //  * This patient is known to be an animal (non-human)
        //  */
        // animal?: PatientAnimal;
        // /**
        //  * A list of Languages which may be used to communicate with the patient about their health
        //  */
        // communication?: PatientCommunication[];
        // /**
        //  * Link to another patient resource that concerns the same actual person
        //  */
        // link?: PatientLink[];
    }
    /**
     * A person with a formal responsibility in the provisioning of healthcare or related services
     */
    interface Practitioner {
        /**
         * An identifier for this practitioner
         */
        identifier?: id;
        /**
         * Whether this practitioner's record is in active use
         */
        active?: boolean;
        /**
         * EDITED
         * The name(s) associated with the practitioner
         */
        name: string[];
        /**
         * NEW
         * A phone number for the practitioner
         */
        phone: string;
        /**
         * NEW
         * A email for the practitioner
         */
        email: string;
        /**
         * NEW
         * Location related to the practitioner
         */
        location: Location;
        /**
         * male | female | other | unknown
         */
        gender: AdministrativeGender;
        /**
         * The date on which the practitioner was born
         */
        birthDate: date;
        /**
         * The organization(s) that the practitioner belongs to (hospital, independent practice, institution)
         */
        organization?: Organization[];
        // /**
        //  * A contact detail for the practitioner (that apply to all roles)
        //  */
        // telecom?: ContactPoint[];
        // /**
        //  * Image of the person
        //  */
        // photo?: Attachment[];
        // /**
        //  * Qualifications obtained by training and certification
        //  */
        // qualification?: PractitionerQualification[];
        // /**
        //  * A language the practitioner is able to use in patient communication
        //  */
        // communication?: CodeableConcept[];
    }
    /**
     * NEW
     * A request by a healthcare practitioner for a patient to set an appointment for a service
     */
    interface ServiceRequest {
        /**
         * An identifier for this service request corresponding to the encounter and appointment if booked
         */
        identifier?: id;
        /**
         * draft | active | on-hold | revoked | completed | entered-in-error | unknown
         */
        status: RequestStatus;
        /**
         * Patient the request is for
         */
        patient: Patient;
        /**
         * Practitioner that requested the service
         */
        orderingPractitioner: Practitioner;
        /**
         * Date request signed
         */
        authoredOn: dateTime;
        /**
         * Services requested
         */
        services: HealthcareService[];
        /**
         * Additional comments
         */
        comment?: string;
    }
    /**
     * The details of a healthcare service available at a location
     */
    interface HealthcareService {
        /**
         * An identifier for this service
         */
        identifier?: id;
        /**
         * Whether this healthcare service is in active use
         */
        active?: boolean;
        /**
         * Description of service as presented to a consumer while searching
         */
        name: string;
        /**
         * NEW
         * Additional description and/or any specific issues not covered elsewhere
         */
        description?: string;
        /**
         * Extra details about the service that can't be placed in the other fields
         */
        extraDetails?: string;
        /**
         * Program Names that categorize the service
         */
        programName?: string[];
        /**
         * If an appointment is required for access to this service
         */
        appointmentRequired: boolean;
        /**
         * NEW
         * Devices needed to perform this service
         */
        devicesNeeded: Device[];
        // /**
        //  * Organization that provides this service
        //  */
        // providedBy?: Reference;
        // /**
        //  * Broad category of service being performed or delivered
        //  */
        // category?: CodeableConcept;
        // /**
        //  * Type of service that may be delivered or performed
        //  */
        // type?: CodeableConcept[];
        // /**
        //  * Specialties handled by the HealthcareService
        //  */
        // specialty?: CodeableConcept[];
        // /**
        //  * Location(s) where service may be provided
        //  */
        // location?: Reference[];
        // /**
        //  * Additional description and/or any specific issues not covered elsewhere
        //  */
        // comment?: string;
        // /**
        //  * Facilitates quick identification of the service
        //  */
        // photo?: Attachment;
        // /**
        //  * Contacts related to the healthcare service
        //  */
        // telecom?: ContactPoint[];
        // /**
        //  * Location(s) service is inteded for/available to
        //  */
        // coverageArea?: Reference[];
        // /**
        //  * Conditions under which service is available/offered
        //  */
        // serviceProvisionCode?: CodeableConcept[];
        // /**
        //  * Specific eligibility requirements required to use the service
        //  */
        // eligibility?: CodeableConcept;
        // /**
        //  * Describes the eligibility conditions for the service
        //  */
        // eligibilityNote?: string;
        // /**
        //  * Collection of characteristics (attributes)
        //  */
        // characteristic?: CodeableConcept[];
        // /**
        //  * Ways that the service accepts referrals
        //  */
        // referralMethod?: CodeableConcept[];
        // /**
        //  * Times the Service Site is available
        //  */
        // availableTime?: HealthcareServiceAvailableTime[];
        // /**
        //  * Not available during this time due to provided reason
        //  */
        // notAvailable?: HealthcareServiceNotAvailable[];
        // /**
        //  * Description of availability exceptions
        //  */
        // availabilityExceptions?: string;
        // /**
        //  * Contains extended information for property 'availabilityExceptions'.
        //  */
        // _availabilityExceptions?: Element;
        // /**
        //  * Technical endpoints providing access to services operated for the location
        //  */
        // endpoint?: Reference[];
    }
    /**
     * A booking of a healthcare event among patient(s), practitioner(s), related person(s) and/or device(s) for a specific date/time. This may result in one or more Encounter(s)
     */
    interface Appointment {
        /**
         * An identifier for this appointment corresponding to the encounter (and service request if applicable)
         */
        identifier?: id;
        /**
         * proposed | pending | booked | arrived | fulfilled | cancelled | noshow | entered-in-error
         */
        status: AppointmentStatus;
        /**
         * Shown on a subject line in a meeting request, or appointment list
         */
        description?: string;
        /**
         * NEW
         * The start and end time of the appointment
         */
        period: Period;
        /**
         * The date that this appointment was initially created
         */
        created: dateTime;
        /**
         * Additional comments
         */
        comment?: string;
        /**
         * EDITED
         * The corresponding service request (if applicable)
         */
        incomingReferral?: ServiceRequest;
        /**
         * NEW
         * Patient involved in appointment
         */
        patient: Patient;
        /**
         * NEW
         * Med Tech involved in appointment
         */
        medTech: MedTech;
        /**
         * NEW
         * The service(s) to be performed
         */
        service: HealthcareService[];
        // /**
        //  * A broad categorisation of the service that is to be performed during this appointment
        //  */
        // serviceCategory?: CodeableConcept;
        // /**
        //  * The specific service that is to be performed during this appointment
        //  */
        // serviceType?: CodeableConcept[];
        // /**
        //  * The specialty of a practitioner that would be required to perform the service requested in this appointment
        //  */
        // specialty?: CodeableConcept[];
        // /**
        //  * The style of appointment or patient that has been booked in the slot (not service type)
        //  */
        // appointmentType?: CodeableConcept;
        // /**
        //  * Reason this appointment is scheduled
        //  */
        // reason?: CodeableConcept[];
        // /**
        //  * Reason the appointment is to takes place (resource)
        //  */
        // indication?: Reference[];
        // /**
        //  * Used to make informed decisions if needing to re-prioritize
        //  */
        // priority?: unsignedInt;
        // /**
        //  * Additional information to support the appointment
        //  */
        // supportingInformation?: Reference[];
        // /**
        //  * When appointment is to take place
        //  */
        // start?: instant;
        // /**
        //  * When appointment is to conclude
        //  */
        // end?: instant;
        // /**
        //  * Can be less than start/end (e.g. estimate)
        //  */
        // minutesDuration?: positiveInt;
        // /**
        //  * The slots that this appointment is filling
        //  */
        // slot?: Reference[];
        // /**
        //  * The ReferralRequest provided as information to allocate to the Encounter
        //  */
        // incomingReferral?: Reference[];
        // /**
        //  * Participants involved in appointment
        //  */
        // participant: AppointmentParticipant[];
        // /**
        //  * Potential date/time interval(s) requested to allocate the appointment within
        //  */
        // requestedPeriod?: Period[];
    }
    /**
     * An interaction during which services are provided to the patient
     */
    interface Encounter {
        /**
         * An identifier for this encounter corresponding to the appointment
         */
        identifier: id;
        /**
         * planned | arrived | triaged | in-progress | onleave | finished | cancelled +
         */
        status: EncounterStatus;
        /**
         * NEW
         * The patient present at the encounter
         */
        patient: Patient;
        /**
         * NEW
         * The med tech present at the encounter
         */
        medTech: MedTech;
        /**
         * The appointment that scheduled this encounter
         */
        appointment: Appointment;
        /**
         * The start and end time of the encounter
         */
        period: Period;
        /**
         * EDITED
         * The location of this encounter
         */
        location: Location;
        /**
         * NEW
         * The services performed at this encounter
         */
        services: HealthcareService[];
        /**
         * NEW
         * The observations as a result of this encounter
         */
        observations: Observation[];
        // /**
        //  * List of past encounter statuses
        //  */
        // statusHistory?: EncounterStatusHistory[];
        // /**
        //  * inpatient | outpatient | ambulatory | emergency +
        //  */
        // class?: Coding;
        // /**
        //  * List of past encounter classes
        //  */
        // classHistory?: EncounterClassHistory[];
        // /**
        //  * Specific type of encounter
        //  */
        // type?: CodeableConcept[];
        // /**
        //  * Indicates the urgency of the encounter
        //  */
        // priority?: CodeableConcept;
        // /**
        //  * The patient ro group present at the encounter
        //  */
        // subject?: Reference;
        // /**
        //  * Episode(s) of care that this encounter should be recorded against
        //  */
        // episodeOfCare?: Reference[];
        // /**
        //  * The ReferralRequest that initiated this encounter
        //  */
        // incomingReferral?: Reference[];
        // /**
        //  * List of participants involved in the encounter
        //  */
        // participant?: EncounterParticipant[];
        // /**
        //  * Quantity of time the encounter lasted (less time absent)
        //  */
        // length?: Duration;
        // /**
        //  * Reason the encounter takes place (code)
        //  */
        // reason?: CodeableConcept[];
        // /**
        //  * The list of diagnosis relevant to this encounter
        //  */
        // diagnosis?: EncounterDiagnosis[];
        // /**
        //  * The set of accounts that may be used for billing for this Encounter
        //  */
        // account?: Reference[];
        // /**
        //  * Details about the admission to a healthcare service
        //  */
        // hospitalization?: EncounterHospitalization;
        // /**
        //  * List of locations where the patient has been
        //  */
        // location?: EncounterLocation[];
        // /**
        //  * The custodian organization of this Encounter record
        //  */
        // serviceProvider?: Reference;
        // /**
        //  * Another Encounter this encounter is part of
        //  */
        // partOf?: Reference;
    }
    /**
     * NEW
     * The process of a med tech delivering samples to a lab
     */
    interface Delivery {
        /**
         * An identifier for this encounter corresponding to the appointment
         */
        identifier: id;
        /**
         * planned | in-progress | arrived | completed
         */
        status?: DeliveryStatus;
        /**
         * The patient relevant to the delivery
         */
        patient: Patient;
        /**
         * The med tech present at the encounter
         */
        medTech: MedTech;
        /**
         * The encounter corresponding to the delivery
         */
        encounter: Encounter;
        /**
         * The laboratory to be delivered to
         */
        laboratory: Laboratory;
        /**
         * Description of what is being delivered
         */
        description: string;
        /**
         * Service(s) related to the delivery
         */
        service: HealthcareService[];
    }
}

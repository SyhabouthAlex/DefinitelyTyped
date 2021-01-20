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
        use?: AddressUse;
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
        line?: string;
        /**
         * Name of city, town etc.
         */
        city?: string;
        /**
         * District name (aka county)
         */
        district?: string;
        /**
         * Sub-unit of country (abbreviations ok)
         */
        state?: string;
        /**
         * Postal code for area
         */
        postalCode?: string;
        /**
         * Country (e.g. can be ISO 3166 2 or 3 letter code)
         */
        country?: string;
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
         * Applicable age range, if relevant
         */
        age?: Range;
        /**
         * Text based reference range in an observation
         */
        text?: string;
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
         * Contains extended information for property 'valueString'.
         */
        _valueString?: Element;
        /**
         * Actual component result
         */
        valueRange?: Range;
        /**
         * Actual component result
         */
        valueDateTime?: dateTime;
        /**
         * Contains extended information for property 'valueDateTime'.
         */
        _valueDateTime?: Element;
        /**
         * Actual component result
         */
        valuePeriod?: Period;
        /**
         * Why the component result is missing
         */
        dataAbsentReason?: string;
        /**
         * High, low, normal, etc.
         */
        interpretation?: string;
        /**
         * Provides guide for interpretation of component result
         */
        referenceRange?: ObservationReferenceRange[];
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
        id?: id;
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
    }
    /**
     * Item used in healthcare
     */
    interface Device {
        /**
         * Instance identifier
         */
        id?: id;
        /**
         * Unique Device Identifier (UDI) Barcode string
         */
        udi?: id;
        /**
         * active | inactive | entered-in-error | unknown
         */
        status?: FHIRDeviceStatus;
        /**
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
    }
    /**
     * Information about an laboratory providing lab services
     */
    interface Laboratory {
        /**
         * An identifier for this laboratory
         */
        id?: id;
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
     * Information about an medical technician providing health care services
     */
    interface MedTech {
        /**
         * An identifier for this med tech
         */
        id?: id;
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
         * Location related to the med tech
         */
        location: Location;
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
        valueRange?: Range;
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
         * How it was done
         */
        method?: string;
        /**
         * Specimen used for this observation
         */
        specimen?: string;
        /**
         * (Measurement) Device
         */
        device?: string;
        /**
         * What is being measured
         */
        measured: string;
        /**
         * Why the component result is missing
         */
        dataAbsentReason?: string;
        /**
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
    }
    /**
     * A grouping of people or organizations with a common purpose
     */
    interface Organization {
        /**
         * An identifier for this organization
         */
        id?: id;
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
         * An location for the organization
         */
        location: Location;
        /**
         * The organization of which this organization forms a part
         */
        partOf?: Organization;
    }
    /**
     * Information about an individual receiving health care services
     */
    interface Patient {
        /**
         * An identifier for this patient
         */
        id?: id;
        /**
         * Whether this patient's record is in active use
         */
        active?: boolean;
        /**
         * A name associated with the patient
         */
        name: string;
        /**
         * A phone number for the patient
         */
        phone: string;
        /**
         * A email for the patient
         */
        email: string;
        /**
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
    }
    /**
     * A person with a formal responsibility in the provisioning of healthcare or related services
     */
    interface Practitioner {
        /**
         * An identifier for this practitioner
         */
        id?: id;
        /**
         * Whether this practitioner's record is in active use
         */
        active?: boolean;
        /**
         * The name(s) associated with the practitioner
         */
        name: string[];
        /**
         * A phone number for the practitioner
         */
        phone: string;
        /**
         * A email for the practitioner
         */
        email: string;
        /**
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
    }
    /**
     * A request by a healthcare practitioner for a patient to set an appointment for a service
     */
    interface ServiceRequest {
        /**
         * An identifier for this service request corresponding to the encounter and appointment if booked
         */
        id?: id;
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
        id?: id;
        /**
         * Whether this healthcare service is in active use
         */
        active?: boolean;
        /**
         * Description of service as presented to a consumer while searching
         */
        name: string;
        /**
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
         * Devices needed to perform this service
         */
        devicesNeeded: Device[];
    }
    /**
     * A booking of a healthcare event among patient(s), practitioner(s), related person(s) and/or device(s) for a specific date/time. This may result in one or more Encounter(s)
     */
    interface Appointment {
        /**
         * An identifier for this appointment corresponding to the encounter (and service request if applicable)
         */
        id?: id;
        /**
         * proposed | pending | booked | arrived | fulfilled | cancelled | noshow | entered-in-error
         */
        status: AppointmentStatus;
        /**
         * Shown on a subject line in a meeting request, or appointment list
         */
        description?: string;
        /**
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
         * The practitioner that made the service request
         */
        practitioner?: Practitioner;
        /**
         * Patient involved in appointment
         */
        patient: Patient;
        /**
         * Med Tech involved in appointment
         */
        medTech: MedTech;
        /**
         * The services to be performed
         */
        services: HealthcareService[];
    }
    /**
     * An interaction during which services are provided to the patient
     */
    interface Encounter {
        /**
         * An identifier for this encounter corresponding to the appointment
         */
        id: id;
        /**
         * planned | arrived | triaged | in-progress | onleave | finished | cancelled +
         */
        status: EncounterStatus;
        /**
         * The patient present at the encounter
         */
        patient: Patient;
        /**
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
         * The location of this encounter
         */
        location: Location;
        /**
         * The services performed at this encounter
         */
        services: HealthcareService[];
        /**
         * The observations as a result of this encounter
         */
        observations: Observation[];
    }
}

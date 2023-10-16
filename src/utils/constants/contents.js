import * as yup from 'yup';

export const contentValidation = {
    "/campd/api-error-messages.json": {
        MDMRetrieval: yup.string().required(),
        bulkDataFiles: yup.string().required(),
        contactUs: yup.string().required(),
        contentManager: yup.string().required(),
        dataPreview: yup.string().required(),
        download: yup.string().required(),
        filterLogic: yup.string().required(),
        s3Outage: yup.string().required(),
    },
    "/campd/alert-banner.json": {
        enable: yup.boolean().required(),
        type: yup.string().required(),
        icon: yup.boolean().required(),
        content: yup.string().required(),
        slim: yup.boolean().required(),
        headingLevel: yup.string().required()
    },
    "/campd/data/bulk-data-files/filters-content.json": {
        labels: yup.array().required(),
        dataTypes: yup.array().required(),
        subTypes: yup.object().shape({
            Emissions: yup.array().required(),
            XML: yup.array().required()
        }).required(),
        groupings: yup.object().shape({
            Emissions: yup.array().required(),
            "Mercury and Air Toxics Emissions (MATS)": yup.array().required()
        }).required(),
        year: yup.object().shape({
            EDR: yup.array().required(),
            XML: yup.object().shape({
                Emissions: yup.array().required(),
                QA: yup.array().required(),
            }).required()
        }).required(),
        quarter: yup.object().shape({
            EDR: yup.array().required(),
            XML: yup.object().shape({
                Emissions: yup.array().required(),
                QA: yup.array().required(),
            }).required()
        }).required(),
        states: yup.array().of(yup.object().shape({
            stateCode: yup.string().required(),
            stateName: yup.string().required(),
            epaRegion: yup.number().required()
        })).required()
    },
    "/campd/data/home/index.json": {
        name: yup.string().required(),
        imgPath: yup.string().required(),
        imgAlt: yup.string().notRequired(),
        description: yup.string().required(),
        url: yup.string().required(),
        button: yup.string().required()
    },
    "/campd/help-support/about/release-notes.json": {
        title: yup.string().required(),
        date: yup.string().required(),
        features: yup.array().required(),
        bugFixes: yup.array().required(),
        upcomingFeatures: yup.array(),
    },
    "/campd/help-support/contact-us/comment-types.json": {
        id: yup.number().required(),
        value: yup.string().required()
    },
    "/campd/help-support/contact-us/submit-status-text.json": {
        status: yup.string().required(),
        message: yup.string().required(),
        email: yup.string().email()
    },
    "/campd/help-support/faqs/topics.json": {
        name: yup.string().required(),
        items: yup.array().of(yup.object({
            title: yup.string().required(),
            content: yup.string().required(),
        })).required()
    },
    "/campd/help-support/related-resources/additional-data-tools.json": {
        name: yup.string().required(),
        url: yup.string().required(),
        description: yup.string().required(),
        externalSite: yup.boolean(),
    },
    "/campd/visualization-gallery/slides.json": {
        image: yup.string().required(),
        title: yup.string().required(),
        callout: yup.string().nullable(),
        text: yup.string().required(),
        link: yup.object().shape({
            url: yup.string().required(),
            text: yup.string().required(),
        }).required(),
    },
    "/campd/visualization-gallery/tools.json": {
        name: yup.string().required(),
        image: yup.string().required(),
        url: yup.string().required(),
        description: yup.string().required(),
        source: yup.object().shape({
            text: yup.string().required(),
            url: yup.string(),
        }).required(),
        keywords: yup.array().required(),
        updated: yup.string().required(),
    }
}

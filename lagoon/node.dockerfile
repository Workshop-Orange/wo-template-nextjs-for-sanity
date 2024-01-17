########################################################
# Start with the node builder image 
########################################################
FROM uselagoon/node-18-builder as builder
ARG LAGOON_ENVIRONMENT_TYPE
ARG NEXT_PUBLIC_SANITY_DATASET
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG SANITY_API_READ_TOKEN
ARG NEXT_PUBLIC_SANITY_API_VERSION
RUN echo "$LAGOON_ENVIRONMENT_TYPE: Running image builder"

COPY package-lock.json package.json /app/
RUN npm install

########################################################
# Switch to the node runner image
########################################################
FROM uselagoon/node-18
ARG LAGOON_ENVIRONMENT_TYPE
ARG NEXT_PUBLIC_SANITY_DATASET
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG SANITY_API_READ_TOKEN
ARG NEXT_PUBLIC_SANITY_API_VERSION
RUN echo "$LAGOON_ENVIRONMENT_TYPE: Switching to image runner"
RUN export

########################################################
# Copy and build
########################################################
COPY --from=builder /app /app
COPY . /app

RUN if [[ "$LAGOON_ENVIRONMENT_TYPE" == "production" ]]; then \
	echo "$LAGOON_ENVIRONMENT_TYPE: Running production build"; \
	npm run build; \
	else \
	echo "$LAGOON_ENVIRONMENT_TYPE: Skipping production build"; \
	fi

########################################################
# Set the command to run
########################################################
CMD ["/app/lagoon/scripts/next.sh"]

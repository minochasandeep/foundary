import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationError, ValidationPipe } from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global pipe that will be applied to all routes
  // This will validate the request body against the DTO
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      return new BadRequestException(
        {
          message: 'Validation failed',
          validationError: true,
          errors: validationErrors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints).join(', '),
          })),
        }

      );
    },
  }));
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle("Connect+ API")
    .addBearerAuth()
    .addSecurityRequirements("bearer")
    .addOAuth2(
      {
        type: "oauth2",
        flows: {
          implicit: {
            authorizationUrl: `${process.env.OKTA_ISSUER}/oauth2/v1/authorize`,
            tokenUrl: `${process.env.OKTA_ISSUER}/oauth2/v1/token`,
            scopes: {
              openid: "openid",
              offline_access: "offline_access",
            }
          },
        },
      },
      "bearer"
    )
    .setBasePath("api")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      initOAuth: {
        clientId: process.env.OKTA_CLIENTID,
        scopeSeparator: " ",
        scopes: ["openid", "offline_access"],
        additionalQueryStringParams: {
          nonce: "nonce",
        },
      },
    }
  });
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.listen(3001);
}
bootstrap();

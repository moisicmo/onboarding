-- CreateTable
CREATE TABLE "beneficiary" (
    "id" SERIAL NOT NULL,
    "ci" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "birth_date" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "consent_accepted" BOOLEAN NOT NULL DEFAULT false,
    "consent_accepted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consent_ip_address" TEXT,
    "is_disabled" BOOLEAN NOT NULL DEFAULT false,
    "is_locked" BOOLEAN NOT NULL DEFAULT false,
    "reason_locked" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "beneficiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "onboarding" (
    "id" SERIAL NOT NULL,
    "beneficiary_id" INTEGER NOT NULL,
    "session_id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Not Started',
    "features" JSONB,
    "ip_analysis" JSONB,
    "id_verification" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "onboarding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "beneficiary_ci_complement_key" ON "beneficiary"("ci", "complement");

-- CreateIndex
CREATE UNIQUE INDEX "onboarding_beneficiary_id_key" ON "onboarding"("beneficiary_id");

-- CreateIndex
CREATE UNIQUE INDEX "onboarding_session_id_key" ON "onboarding"("session_id");

-- AddForeignKey
ALTER TABLE "onboarding" ADD CONSTRAINT "onboarding_beneficiary_id_fkey" FOREIGN KEY ("beneficiary_id") REFERENCES "beneficiary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

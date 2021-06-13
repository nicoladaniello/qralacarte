import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../components/admin/AdminLayout";
import CreateMenuLayout from "../../../../components/onboarding/CreateMenuLayout";
import TitleFormWizard from "../../../../components/onboarding/form/TitleFormWizard";
import UrlFormWizard from "../../../../components/onboarding/form/UrlFormWizard";
import { useInsertVenueMutation } from "../../../../features/venues/api";

const steps = {
  title: () => TitleFormWizard,
  slug: () => UrlFormWizard,
};

const AdminNewRestaurant = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [Step, setStep] = useState(steps.title);
  const [insertVenue, { isLoading, isSuccess }] = useInsertVenueMutation();
  const router = useRouter();

  useEffect(() => void console.log(Step.name), [Step]);

  useEffect(() => {
    if (isSuccess) router.push("/admin/venues");
  }, [isSuccess]);

  const handleSubmit = (values) => {
    if (Step.name === steps.title().name) {
      const slug = values.title
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");

      setData({ ...values, slug });
      setStep(steps.slug);
    } else {
      insertVenue(data);
    }
  };

  return (
    <AdminLayout>
      <CreateMenuLayout>
        {error && <div className="alert alert-danger">{error.message}</div>}
        <Step data={data} onSubmit={handleSubmit} />
      </CreateMenuLayout>
    </AdminLayout>
  );
};

export default AdminNewRestaurant;

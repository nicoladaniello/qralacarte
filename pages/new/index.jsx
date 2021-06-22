import classnames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";
import Page from "../../components/Page";
import useAuth from "../../features/auth/useAuth";
import { useCreateMenuMutation } from "../../features/menus/api";

const NewMenuPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [createMenu, { data, error, isLoading, isSuccess, isError }] =
    useCreateMenuMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submit.
  const onSubmit = (data) => {
    createMenu({ userId: currentUser.uid, ...data });
  };

  useEffect(() => {
    if (isSuccess)
      router.push("/admin/menus/[slug]", `/admin/menus/${data._key}`);
  }, [isSuccess, router]);

  return (
    <Page title="Create a contactless menu">
      <div className="row g-0 h-100 align-items-stretch bg-white">
        <div className="col-sm-5 d-none d-sm-block">
          <div className="position-relative h-100">
            <Image
              alt="Sign in"
              src="/images/illustrations/qr-code.svg"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="col-sm-7 p-lg-4 d-flex">
          <div className="m-auto">
            <div className="text-center text-lg-start">
              <h1>Add your online menu</h1>
              <p className="lead">Create your contactless menu in seconds.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-grid gap-2">
                {isError && <Alert danger>{error?.message}</Alert>}
                <div>
                  <label className="form-label">Business name</label>
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.title,
                    })}
                    {...register("title", { required: "Inserisci un titolo." })}
                  />
                  <div className="invalid-feedback">
                    {errors?.title?.message}
                  </div>
                </div>
                <div>
                  <label className="form-label">Page URL</label>
                  <div className="input-group">
                    <span
                      className="input-group-text bg-transparent border-end-0"
                      style={{ boxShadow: "inset 0 1px 2px rgb(0 0 0 / 8%)" }}
                    >
                      https://qralacarte.com/r/
                    </span>
                    <input
                      type="text"
                      className={classnames("form-control fw-bold", {
                        "is-invalid": errors.slug,
                      })}
                      {...register("slug", {
                        required: "Inserisci un indirizzo.",
                      })}
                    />
                    <div className="invalid-feedback">
                      {errors?.slug?.message}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? <Loading /> : "Create Menu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default NewMenuPage;

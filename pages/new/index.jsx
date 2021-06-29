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
import QRCodeModal from "../../features/menus/QRCodeModal";
import { useModal } from "../../features/modals";
import { useSignInAnonymouslyMutation } from "../../features/users/api";
import { slugify } from "../../utils/utils";

const NewMenuPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [createMenu, { data, error, isLoading, isSuccess, isError }] =
    useCreateMenuMutation();
  const [signInAnonymously] = useSignInAnonymouslyMutation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm({ mode: "onChange" });
  const qrCodeModal = useModal(QRCodeModal);

  const watchTitle = watch("title");

  // Handle form submit.
  const onSubmit = async (data) => {
    let userId;

    // Let anonymous user create menus
    if (!currentUser) {
      const action = signInAnonymously();
      const data = await action.unwrap();
      userId = data.uid;
    } else userId = currentUser.uid;

    createMenu({ userId, ...data });
  };

  useEffect(() => {
    if (!dirtyFields.slug && watchTitle) setValue("slug", slugify(watchTitle));
  }, [watchTitle, dirtyFields, setValue]);

  useEffect(() => {
    if (!isSuccess) return;
    qrCodeModal.open({ slug: data._key });
    router.push("/admin/menus/[slug]", `/admin/menus/${data._key}`);
  }, [isSuccess, data, router]);

  return (
    <Page title="Create a contactless menu">
      <div className="row g-0 h-100 align-items-center">
        <div className="col-lg-6 d-none d-lg-block">
          <Image
            alt="Sign in"
            src="/images/illustrations/qr-code.svg"
            layout="responsive"
            width="500"
            height="500"
          />
        </div>
        <div className="col-12 col-lg-6 d-flex">
          <div className="my-auto">
            <div className="text-center text-lg-start">
              <h1 className="fw-bold mb-0">Create your digital menu</h1>
              <p className="lead">Fill in the form below to get started.</p>
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
                    placeholder="E.g.: Restaurant Bellavista"
                    {...register("title", {
                      required: "Inserisci un titolo.",
                    })}
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
                      {process.env.NEXT_PUBLIC_MENU_BASE_URL}
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

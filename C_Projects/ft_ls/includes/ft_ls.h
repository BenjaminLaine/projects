/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_ls.h                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/02/13 14:09:34 by blaine            #+#    #+#             */
/*   Updated: 2020/06/18 00:49:57 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef FT_LS_H
# define FT_LS_H
# include <pwd.h>
# include <grp.h>
# include <time.h>
# include <errno.h>
# include <string.h>
# include <stdlib.h>
# include <dirent.h>
# include <unistd.h>
# include <sys/stat.h>
# include <sys/types.h>

typedef struct		s_opt
{
	int				a;
	int				l;
	int				r;
	int				rr;
	int				t;
}					t_opt;

typedef struct		s_data
{
	char			*name;
	char			*user;
	char			*group;
	char			*path;
	char			perm[11];
	int				size;
	unsigned long	link;
	char			*mtime;
	char			*link_name;
	struct stat		stats;
}					t_data;

typedef struct		s_file
{
	t_data			*data;
	struct s_file	*next;
}					t_file;

typedef struct		s_dir
{
	char			*previous;
	char			*path;
	t_file			*files;
	struct s_dir	*next;
}					t_dir;

typedef struct		s_max
{
	int				links;
	int				user;
	int				group;
	int				size;
	int				perm;
	int				name;
	int				total;
}					t_max;

void				ft_fill_folder(t_dir *dir, t_opt *opt, int i);
void				ft_get_user(t_file **file);
void				ft_get_link(t_file **file);
char				*ft_strnew(size_t size);
void				ft_over(char **dest, char *new, size_t start, size_t len);
void				ft_strdel(char **as);
void				ft_get_date(t_file **file);

/*
** ft_file.c, file handle.
*/
char				*ft_name(char *path);
void				ft_get_perm(t_file **filep);
void				ft_file_type(t_file **filep);
void				ft_free_files(t_file **files, t_opt *opt);
void				ft_lst_file(t_file **alst, t_file *newblock);
t_file				*ft_new_file(t_opt *opt, char *name, t_max *max);
void				opt_l(t_file **file, t_max *max);
/*
** ft_init.c, initialize structs.
*/
t_max				ft_init_max(void);
t_dir				*ft_init_dir(void);
t_opt				*ft_init_opti(void);
/*
** ft_print.c, quite obviously print on screen.
*/
void				ft_usage(char c);
void				ft_print_n(t_file **files);
void				ft_print_l(t_file **files, t_max max, int arg);
void				ft_print_files(t_file *fil, t_opt *opt, int arg, t_max max);
/*
** libft
*/
void				ft_putstr(char *str);
char				*ft_strdup(char *str);
char				*ft_itoa(long long n);
size_t				ft_strlen(const char *str);
int					ft_printf(const char *str, ...);
int					ft_strcmp(const char *str1, const char *str2);
char				*ft_strjoin(const char *str1, const char *str2);
char				*ft_strsub(char const *s, unsigned int start, size_t len);
char				*ft_strcpy(char *dest, const char *src);
/*
** Sortting
*/
t_file				*ft_merge_sort(t_file *list, t_opt *opt);
t_file				*ft_find_middle(t_file *list);
t_file				*ft_merge_list_t(t_file *first, t_file *second, t_opt *opt);
t_file				*ft_merge_list(t_file *first, t_file *second, t_opt *opt);
void				ft_sort_nn(t_dir **args);
void				ft_sort_nr(t_dir **args);
void				ft_sort_tn(t_dir **args);
void				ft_sort_tr(t_dir **args);
void				ft_sort_a(t_dir **args, t_opt *opt);
void				ft_sort_fa(t_file **args, t_opt *opt);
int					ft_date_cmp(t_dir *current, t_dir *next);
void				ft_sort_1(t_dir **current, t_dir **next, int *sorted);
void				ft_sort_2(t_dir **current, t_dir **next, int *sorted);
void				ft_sort_3(t_dir **current, t_dir **next, int *sorted);
void				ft_sort_4(t_dir **current, t_dir **next, int *sorted);
/*
** ft_is.c, for checking file types.
*/
int					ft_is_dir(char *name);
int					ft_is_file(char *name);
int					ft_is_file_or_dir(char *name);
/*
** ft_args.c, get args and create liked list from args.
*/
t_dir				*ft_new_dir(char *content);
void				ft_get_opt(char *argv, t_opt *opt);
void				ft_get_path(char *argv, t_dir *dir, int *error);
t_dir				*ft_lst_dir(t_dir **alst, t_dir *newblock);
void				ft_get_args(char **argv, t_opt *opt, t_dir *dir, int argc);

#endif

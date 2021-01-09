/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_args.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/03/03 17:01:14 by blaine            #+#    #+#             */
/*   Updated: 2020/06/17 23:37:45 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

void	ft_get_opt(char *argv, t_opt *opt)
{
	int i;

	i = 0;
	if (argv[0] == '-')
	{
		while (argv[++i])
		{
			if (argv[i] == 'a')
				opt->a = 1;
			else if (argv[i] == 'l')
				opt->l = 1;
			else if (argv[i] == 'r')
				opt->r = 1;
			else if (argv[i] == 'R')
				opt->rr = 1;
			else if (argv[i] == 't')
				opt->t = 1;
			else if (argv[i] == '-' && argv[i + 1] == '\0')
				;
			else
				ft_usage(argv[i]);
		}
	}
}

void	ft_get_path(char *argv, t_dir *dir, int *error)
{
	if (ft_is_file_or_dir(argv))
	{
		if (dir->path == NULL)
		{
			dir->path = ft_strdup(argv);
			dir->next = NULL;
		}
		else
			ft_lst_dir(&dir, ft_new_dir(argv));
	}
	else
	{
		ft_printf("ft_ls: %s: %s\n", argv, strerror(errno));
		*error = 1;
	}
}

void	ft_get_args(char **argv, t_opt *opt, t_dir *dir, int argc)
{
	int i;
	int error;

	error = 0;
	i = 0;
	while (++i < argc)
	{
		if (argv[i][0] == '-' && !(ft_is_file_or_dir(argv[i])))
			ft_get_opt(argv[i], opt);
		else
			ft_get_path(argv[i], dir, &error);
	}
	if (dir->path == NULL && error == 0)
		dir->path = ft_strdup(".");
}

t_dir	*ft_lst_dir(t_dir **alst, t_dir *newblock)
{
	t_dir	*move;

	if (newblock)
	{
		if (!(*alst))
		{
			(*alst) = newblock;
			return (newblock);
		}
		move = (*alst);
		while (move->next)
			move = move->next;
		move->next = newblock;
		return (newblock);
	}
	return (NULL);
}

t_dir	*ft_new_dir(char *content)
{
	t_dir *new;

	if (!(new = malloc(sizeof(t_dir))))
		ft_printf("%s\n", strerror(errno));
	if (!(new->path = ft_strdup(content)))
		ft_printf("%s\n", strerror(errno));
	new->next = NULL;
	new->previous = NULL;
	new->files = NULL;
	return (new);
}
